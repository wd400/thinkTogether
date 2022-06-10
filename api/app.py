from flask import Flask, g, jsonify, Response
from flask.globals import current_app
from flask import request
import hashlib
import psycopg2
from psycopg2 import pool
from lxml import etree
import re
from flask_cors import CORS
import os
from psycopg2 import errors

UniqueViolation = errors.lookup('23505')  # Correct way to Import the psycopg2 errors

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
#
#https://www.liquid-technologies.com/online-xml-to-xsd-converter
xmlschema_doc = etree.parse('schema.xsd')
xmlschema = etree.XMLSchema(xmlschema_doc)

def validatexml( xml: str):
    
    try:
        xml_doc = etree.fromstring(xml)
    except:
        return  None
    if xmlschema.validate(xml_doc):
        return xml_doc
  #  return xml_doc      
    return None


def parseXML(root):
    """
    Parse the xml
    """

    text=""
    for appt in root.getchildren():
        for elem in appt.getchildren():
            if elem.tag in ('Container','Connector','Rect'):
                toappend=elem.get('label')
                if len(toappend)>0:
                    text+=toappend+'.'*(toappend[-1]!='.')+'\n'
    return(text)


def validmail(email:str):
    if(re.fullmatch(regex, email)):
        return True
    return False

def validpseudo(pseudo:str):
    return 1<=len(pseudo)<=20 and pseudo.isalnum()

def get_db():
#    print ('GETTING CONN')
    if 'db' not in g:
        g.db = app.config['postgreSQL_pool'].getconn()
    return g.db

def securehash(input:str):
    hash_object = hashlib.md5((input+'81613774354046467146').encode('utf-8'))
    return hash_object.hexdigest()

def useridFromToken(token:str,cursor):
    cursor.execute("SELECT users.userid,banned FROM users,tokens WHERE tokens.userid=users.userid and tokens.token=%(token)s; ",
        {'token':token })
    result=cursor.fetchone()
    if result is None:
        return None,True
    
    return result[0],result[1]
    


def create_app():
    app = Flask(__name__)
    app.config['DEBUG'] = True
    CORS(app,resources={r"/*": {"origins": "*"}})

    app.config['postgreSQL_pool'] = psycopg2.pool.SimpleConnectionPool(1, 20,user = os.environ.get('POSTGRES_USER'),
                                                  password = os.environ.get('POSTGRES_PASSWORD'),
                                                  host = "db",
                                                  port = "5432",
                                                  database = os.environ.get('POSTGRES_DB'))

    @app.teardown_appcontext
    def close_conn(e):
        db = g.pop('db', None)
        if db is not None:
            app.config['postgreSQL_pool'].putconn(db)


    @app.route('/login', methods = ['POST'])
    def login():
        email = request.json.get('logininfo').get('email').lower()
      
        if type(email)!=str or not validmail(email):
            return Response(status=400)
        password = request.json.get('logininfo').get('password')
        if type(password)!=str:
            return Response(status=400)
        db = get_db()
        cursor = db.cursor()

        cursor.execute("SELECT userid FROM users WHERE email=%(email)s AND hash=%(hash)s;",
        {
            'hash':securehash(password),
        'email':email})
        userid = cursor.fetchone()
        if userid is None:
            cursor.close()
            return Response(status=403)

        

        cursor.execute("INSERT INTO tokens (userid,token) VALUES (%(userid)s ,md5(random()::text)) RETURNING TOKEN;",
        {
        'userid':userid})
        result = cursor.fetchone()

        if result is None:
            return Response(status=405)
        db.commit()
        cursor.close()

    #    response = Response(status=200)
   #     response.set_cookie('token',result[0])       
        return Response(result[0])

    @app.route('/register', methods = ['POST'])
    def register():
        email = request.json.get('email').lower()
        if not validmail(email):
            return Response(status=400)
        
        pseudo= request.json.get('name')
        if type(pseudo)!=str or not validpseudo(pseudo):
            return Response(status=400)

        password = request.json.get('password')
        if type(password)!=str or not (8<=len(password)<=30):
            return Response(status=400)
        db = get_db()
        cursor = db.cursor()
        
        try:
            cursor.execute("INSERT INTO users (email,pseudo,hash) VALUES (%(email)s,%(pseudo)s,%(hash)s);",
        {'hash':securehash(password),
        'email':email,
        'pseudo':pseudo
        })
        except UniqueViolation as err:
        	cursor.close()
        	return Response(status=405)
        	
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        db.commit()
        cursor.close()
  
        return  Response(status=200)

    @app.route('/renameuser', methods = ['POST'])
    def renameuser():
        token = request.headers.get('Authorization')
        
        pseudo= request.json.get('data')
        if type(pseudo)!=str or not validpseudo(pseudo):
            return Response(status=400)

        password = request.json.get('password')

        if type(password)!=str:
            return Response(status=400)

        db = get_db()
        
        cursor = db.cursor()
        userid, banned = useridFromToken(token,cursor)
        if banned:
            cursor.close()
            return Response(status=403)

        cursor.execute("UPDATE users SET pseudo=%(pseudo)s WHERE hash=%(hash)s AND userid=%(userid)s; ",
        {'hash':securehash(password),
        'userid':userid,
        'pseudo':pseudo
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        db.commit()
        cursor.close()
  
        return  Response(status=200)
    


    @app.route('/changepassword', methods = ['POST'])
    def changepassword():
        token = request.headers.get('Authorization')
    

        password = request.json.get('password')
        if type(password)!=str or not (8<=len(password)<=30):
            return Response(status=400)
        newpassword = request.json.get('data')
        if type(newpassword)!=str:
            return Response(status=400)

        db = get_db()
        cursor = db.cursor()

        userid, banned = useridFromToken(token,cursor)
        if banned:
            cursor.close()
            return Response(status=403)
        

        cursor.execute("UPDATE users SET hash=%(newhash)s WHERE hash=%(hash)s AND userid=%(userid)s ;  ",
        {'hash':securehash(password),
        'userid':userid,
        'newhash':securehash(newpassword)
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        db.commit()
        cursor.close()
  
        return  Response(status=200)


    @app.route('/changemail', methods = ['POST'])
    def changemail():
        token = request.headers.get('Authorization')
    

        password = request.json.get('password')
        if type(password)!=str:
            return Response(status=400)
        newmail = request.json.get('data')
        if type(newmail)!=str or not validmail(newmail):
            return Response(status=400)

        db = get_db()
        cursor = db.cursor()

        userid, banned = useridFromToken(token,cursor)
        if banned:
            cursor.close()
            return Response(status=403)
        

        cursor.execute("UPDATE users SET email=%(newmail)s WHERE hash=%(hash)s AND userid=%(userid)s ;  ",
        {'hash':securehash(password),
        'userid':userid,
        'newmail':newmail
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        db.commit()
        cursor.close()
  
        return  Response(status=200)


    @app.route('/deleteaccount', methods = ['POST'])
    def deleteaccount():
        token = request.headers.get('Authorization')
        

        password = request.json.get('password')

        if type(password)!=str:
            return Response(status=400)

        db = get_db()
        cursor = db.cursor()

        userid, banned = useridFromToken(token,cursor)
        if banned:
            cursor.close()
            return Response(status=403)
        

        cursor.execute("DELETE FROM users WHERE hash=%(hash)s AND userid=%(userid)s;  ",
        {'hash':securehash(password),
        'userid':userid,
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        db.commit()
        cursor.close()
  
        return  Response(status=200)


    @app.route('/getuserinfo/<int:userid>', methods = ['GET'])
    def getuserinfo(userid):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT pseudo,score,banned FROM users WHERE userid=%(userid)s; ",
        {'userid':userid })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=404)

        result=cursor.fetchone()
        result={'pseudo':result[0],'score':result[1],'banned':result[2]}
        cursor.close()
  
        return jsonify(result)


    #TODO:useless?
    @app.route('/getuserinfo/me', methods = ['GET'])
    def getmyinfo():

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()

        userid, banned = useridFromToken(token,cursor)


        cursor.execute("SELECT pseudo,score,banned FROM users WHERE userid=%(userid)s; ",
        {'userid':userid })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        result=cursor.fetchone()
        result={'pseudo':result[0],'score':result[1],'banned':result[2]}
        cursor.close()
  
        return jsonify(result)


    @app.route('/board/<int:boardid>', methods = ['GET'])
    def getboard(boardid):

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
    #    if userid is None:
    #        return Response(status=400)
    #    print("userid",userid)
        if userid==None:
            cursor.execute("""SELECT false, CASE WHEN anonym=false THEN userid END,board.title,board.description,board.graphxml,board.category,lastmodif FROM board WHERE board.boardid=%(boardid)s AND board.public=true LIMIT 1;""",
        {'userid':userid,
        'boardid':boardid })
        else:
            cursor.execute("""SELECT userid=%(userid)s, CASE WHEN anonym=false OR userid=%(userid)s THEN userid END,board.title,board.description,board.graphxml,board.category,lastmodif FROM board WHERE  board.boardid=%(boardid)s AND (board.public=true or board.userid=%(userid)s or EXISTS(SELECT 1 FROM collaboration where (collaboration.boardid=board.boardid AND collaboration.invited=%(userid)s)  )) LIMIT 1;""",
        {'userid':userid,
        'boardid':boardid })
     #   print('cursor.rowcount',cursor.rowcount)
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)

        result=cursor.fetchone()
        result={'owned':result[0],'userid':result[1],'title':result[2],'description':result[3],'xml':result[4],'cat':result[5],'lastmodif':result[6]}
        cursor.close()
  
        return jsonify(result)




    @app.route('/boards/<int:userid>', methods = ['GET'])
    def getboards(userid):

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        myuserid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        print(userid,myuserid)
        if userid==myuserid:
            cursor.close()
            return Response(status=301)
        elif myuserid is None:
            cursor.execute("""SELECT board.boardid,board.title,board.description,board.category
            FROM board WHERE board.public=true and board.userid=%(userid)s ;""",
            {'userid':userid,
            'myuserid':myuserid})

        else:

            cursor.execute("""SELECT board.boardid,board.title,board.description
            FROM board WHERE ( board.public=true or (SELECT EXISTS(SELECT 1 FROM collaboration where collaboration.boardid=boardid and invited=%(userid)s LIMIT 1)) ) and board.userid=%(userid)s ;""",
            {'userid':userid,
            'myuserid':myuserid})

        fetched=cursor.fetchall()
        cursor.close()
        result=[]
        for line in fetched:
            result.append({'boardid':line[0],'title':line[1],'description':line[2]})
        
        return jsonify(result)




    @app.route('/boards/me', methods = ['GET'])
    def getmyboards():

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)

        if userid is None:
            cursor.close()
            return Response(status=403)


        cursor.execute("""SELECT boardid,title,description,public,anonym,category
         FROM board WHERE userid=%(userid)s ;""",
        {
        'userid':userid})
        fetched=cursor.fetchall()
        cursor.close()
        result=[]
        for line in fetched:
            result.append({'boardid':line[0],'title':line[1],'description':line[2],'public':line[3],'anonym':line[4],'cat':line[5]})
        
        return jsonify(result)



    @app.route('/board/random', methods = ['GET'])
    def getrandomboard():

        db = get_db()
        cursor = db.cursor()
        
        token = request.headers.get('Authorization')
        userid=None
        if token is not None:
        	userid,banned=useridFromToken(token,cursor)
        




        cursor.execute("""SELECT userid,boardid,title,description,graphxml,category,lastmodif
         FROM board  where public=true OFFSET floor(random() * (
		SELECT
			COUNT(*)
			FROM board where public=true));""",)
        fetched=cursor.fetchone()
        cursor.close()
        return jsonify({'owned':fetched[0]==userid,'userid':fetched[0],'boardid':fetched[1],'title':fetched[2],'description':fetched[3],'xml':fetched[4],'cat':fetched[5],'lastmodif':fetched[6]})

    @app.route('/newboard', methods = ['POST'])
    def newboard():

        token=request.headers.get('Authorization')
        title=request.json.get('title')
        if type(title)!=str:
            return Response(status=401)
        description=request.json.get('description')
        if type(title)!=str:
            return Response(status=402)
        public=request.json.get('public')
        if type(public)!=bool:
            return Response(status=403)
        anonym=request.json.get('anonym')
        if type(anonym)!=bool:
            return Response(status=403)
            
        cat=request.json.get('cat')
        if not (type(cat)==int and 0<=cat<=3):
            return Response(status=403)
        

        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=404)
        if banned:
            return Response(status=403)


        cursor.execute("""
                SELECT newboard(%(userid)s,%(title)s,%(description)s,%(public)s,%(anonym)s,%(cat)s);

         
        """,
        {'userid':userid,
        'title':title,
        'description':description,
        'public':public,
        'anonym':anonym,
        'cat':cat
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        result=cursor.fetchone()
        result={'boardid':result[0]}
        cursor.close()
  
        return jsonify(result)

    

    @app.route('/deleteboard/<int:boardid>', methods = ['GET'])
    def deleteboard(boardid):

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)


        cursor.execute("""DELETE FROM board WHERE boardid=%(boardid)s and userid=%(userid)s ;""",
        {'userid':userid,
        'boardid':boardid})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
        print("suppr",boardid)
        return Response(status=200)

    @app.route('/updateboardcontent/<int:boardid>', methods = ['POST'])
    def updateboard(boardid):

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=401)
        if banned:
            return Response(status=403)

        xml= request.json.get('xml')
        #todo: check xml size
        if type(xml)!=str:
            return Response(status=402)

        #check xml
        tree=validatexml(xml)
        print(tree)
        if tree is None:
            return Response(status=403)

        text=parseXML(tree)
        #extract text


        cursor.execute("""UPDATE board SET graphxml = %(xml)s, textcontent = %(text)s,lastmodif=CURRENT_TIMESTAMP(0) WHERE boardid = %(boardid)s AND userid=%(userid)s;""",
        {'userid':userid,
        'boardid':boardid,
        'xml':xml,
        'text':text})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=404)
        db.commit()
        cursor.close()
  
        return Response(status=200)

    @app.route('/renameboard/<int:boardid>', methods = ['POST'])
    def renameboard(boardid):
        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        if banned:
            return Response(status=403)
        title=request.json.get('data')
        if type(title)!=str:
            return Response(status=400)
        cursor.execute("""UPDATE board SET title = %(title)s WHERE boardid = %(boardid)s AND userid=%(userid)s;""",
        {'userid':userid,
        'boardid':boardid,
        'title':title})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
  
        return Response(status=200)


    @app.route('/changecat/<int:boardid>', methods = ['POST'])
    def changecat(boardid):
        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        if banned:
            return Response(status=403)

        cat=request.json.get('data')
        if not (type(cat)==int and 0<=cat<=3):
            return Response(status=403)
        cursor.execute("""UPDATE board SET category = %(cat)s WHERE boardid = %(boardid)s AND userid=%(userid)s;""",
        {'userid':userid,
        'boardid':boardid,
        'cat':cat})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
  
        return Response(status=200)



    @app.route('/changedescription/<int:boardid>', methods = ['POST'])
    def changedescription(boardid):
        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        if banned:
            return Response(status=403)
        description=request.json.get('data')
        print("description",description)
        if type(description)!=str:
            return Response(status=400)
        cursor.execute("""UPDATE board SET description = %(description)s WHERE boardid = %(boardid)s AND userid=%(userid)s;""",
        {'userid':userid,
        'boardid':boardid,
        'description':description})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
  
        return Response(status=200)



    @app.route('/changepublic/<int:boardid>', methods = ['POST'])
    def changepublic(boardid):
        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        public=request.json.get('data')
        if type(public)!=bool:
            return Response(status=400)
        
        cursor.execute("""UPDATE board SET public = %(public)s WHERE boardid = %(boardid)s AND userid=%(userid)s;""",
        {'userid':userid,
        'boardid':boardid,
        'public':public})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
  
        return Response(status=200)

    @app.route('/changeanonym/<int:boardid>', methods = ['POST'])
    def changeanonym(boardid):
        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        anonym=request.json.get('data')
        cursor.execute("""UPDATE board SET anonym = %(anonym)s WHERE boardid = %(boardid)s AND userid=%(userid)s;""",
        {'userid':userid,
        'boardid':boardid,
        'anonym':anonym})
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
  
        return Response(status=200)  


    @app.route('/makesuggestion/<int:boardid>/<int:caseid>', methods = ['POST'])
    def makesuggestion(boardid,caseid):

        token=request.headers.get('Authorization')
        suggestion=request.json.get('suggestion')
        if type(suggestion)!=str:
            return Response(status=400)


        anonym=request.json.get('anonym')
        if type(anonym)!=bool:
            return Response(status=402)

        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if banned:
            return Response(status=403)
        if userid is None:
            return Response(status=400)


        cursor.execute("""
                do $$
BEGIN
  IF (SELECT public FROM board WHERE  boardid=%(boardid)s LIMIT 1) OR (SELECT true FROM collaboration where boardid=%(boardid)s and invited=%(userid)s) THEN
    INSERT INTO suggestion (boardid, writer, suggestion,caseid,anonym) VALUES (%(boardid)s,%(userid)s,%(suggestion)s,%(caseid)s,%(anonym)s);
  END IF;
END;
         $$
        """,
        {'userid':userid,
        'boardid':boardid,
        'suggestion':suggestion,
        'caseid':caseid,
        'anonym':anonym
        })

        db.commit()
   #     result=cursor.fetchone()
   #     result={'suggestionid':result[0]}
        cursor.close()
  
        return Response(status=200)

    @app.route('/ratesuggestion/<int:suggestionid>', methods = ['POST'])
    def ratesuggestion(suggestionid):

        token=request.headers.get('Authorization')
        rating=request.json.get('rating')
        if type(rating)!=int:
            return Response(status=401)

        if not rating in range(0,11):
            return Response(status=400)

        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)


        cursor.execute("""
                
do $$
BEGIN
  IF (SELECT 1 FROM board,suggestion WHERE  suggestion.suggestionid=%(suggestionid)s and suggestion.boardid=board.boardid and board.userid=%(userid)s LIMIT 1) THEN
    with writerrow as (
		DELETE FROM suggestion WHERE suggestion.suggestionid=%(suggestionid)s returning writer
	)
	UPDATE users SET score=score+%(rating)s WHERE userid=(select writer from writerrow);

  END IF;
END;
$$

        """,
        {'userid':userid,
        'suggestionid':suggestionid,
        'rating':rating,
        })
        db.commit()
        cursor.close()
  
        return Response(status=200)


    @app.route('/reportsuggestion/<int:suggestionid>', methods = ['POST'])
    def reportsuggestion(suggestionid):

        token=request.headers.get('Authorization')
        reason=request.json.get('reason')
        if type(reason)!=int:
            return Response(status=400)
        detail=request.json.get('detail')
        if detail==None:
            detail=''
        elif type(detail) != str :
            return Response(status=402)



        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)



        cursor.execute("""
                
do $$
BEGIN
  IF (SELECT 1 FROM board,suggestion WHERE  suggestion.suggestionid=%(suggestionid)s and suggestion.boardid=board.boardid and board.userid=%(userid)s LIMIT 1) THEN
    with writerrow as (
		DELETE FROM suggestion WHERE suggestion.suggestionid=%(suggestionid)s returning boardid,writer,suggestion,caseid
	)
	INSERT INTO report (ressourceid,reporter,reported,reason,detail) SELECT CONCAT(writerrow.boardid,':',writerrow.caseid,':',writerrow.suggestion),%(userid)s,writerrow.writer,%(reason)s,%(detail)s FROM writerrow;

  END IF;
END;
$$

        """,
        {'userid':userid,
        'suggestionid':suggestionid,
        'reason':reason,
        'detail':detail
        })
        db.commit()
        cursor.close()
        return Response(status=200)
    



    @app.route('/viewsuggestions/<int:boardid>', methods = ['GET'])
    def viewsuggestions(boardid):

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)


        cursor.execute("""
        SELECT suggestion.suggestionid, CASE WHEN suggestion.anonym=false THEN suggestion.writer END,
        suggestion.suggestion,suggestion.caseid from suggestion,board where suggestion.boardid=%(boardid)s and suggestion.boardid=board.boardid 
        and board.userid=%(userid)s
        """,
        {'userid':userid,
        'boardid':boardid})
        #suggestionid,author,suggestion
        fetched=cursor.fetchall()
        cursor.close()
        result=[]
        for line in fetched:
            result.append({'suggestionid':line[0],'author':line[1],'suggestion':line[2],'cellid':line[3]})
        
        return jsonify(result)

    @app.route('/search', methods = ['POST'])
    def search():
        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        query=request.json.get('query')
        if type(query)!=str:
            return Response(status=400)
        page=request.json.get('page')
        if type(page)!=int:
            return Response(status=400)
            
            
        cat=request.json.get('cat')
        if not (type(cat)==int and -1<=cat<=3):
            return Response(status=403)

        if cat==-1:
            cursor.execute("""SELECT boardid, CASE WHEN anonym=false THEN userid END, title, description,category,lastmodif
	FROM board WHERE public=true 
	ORDER BY ts_rank(textsearchable, plainto_tsquery('english', %(query)s))+ 0.45*word_similarity(title, %(query)s)+0.35*word_similarity(description, %(query)s)+0.2*word_similarity(textcontent, %(query)s) DESC LIMIT 10 OFFSET %(offset)s;""",{'query':query,'offset':10*page})
        else:
            cursor.execute("""SELECT boardid, CASE WHEN anonym=false THEN userid END, title, description,category,lastmodif
	FROM board WHERE public=true and category=%(category)s 
	ORDER BY ts_rank(textsearchable, plainto_tsquery('english', %(query)s))+ 0.45*word_similarity(title, %(query)s)+0.35*word_similarity(description, %(query)s)+0.2*word_similarity(textcontent, %(query)s) DESC LIMIT 10 OFFSET %(offset)s;
		""",
		{'query':query,
		'offset':10*page,
		'category':cat})
#	if userid is None:
#        else:
#            cursor.execute("""
#        SELECT boardid, CASE WHEN anonym=false THEN userid END, title, description
#FROM board WHERE public=true OR userid=%(userid)s OR (SELECT EXISTS(SELECT 1 FROM collaboration where collaboration.boardid=boardid and invited=%(userid)s LIMIT 1))
#ORDER BY ts_rank(textsearchable, plainto_tsquery('english', %(query)s)) DESC LIMIT 10 OFFSET %(offset)s;
#        """,
#        {'userid':userid,
#        'query':query,
#        'offset':10*page})
        fetched=cursor.fetchall()
        result=[]
        for line in fetched:
            result.append({'boardid':line[0],'author':line[1],'title':line[2],'description':line[3],'cat':line[4],'lastmodif':line[5]})
        cursor.close()
        return jsonify(result)

    @app.route('/revoketoken', methods = ['GET'])
    def revoketoken():
        
        token = request.headers.get('Authorization')
        db = get_db()
        print("token",token)
        cursor = db.cursor()
        cursor.execute("""DELETE FROM tokens WHERE token=%(token)s;""",
        {
        'token':token})
        print("cursor.rowcount",cursor.rowcount)
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
  
        return Response(status=200)
        

    @app.route('/refreshtoken', methods = ['GET'])
    def refreshtoken():
        
        token = request.headers.get('Authorization')
        db = get_db()
        print("token",token)
        cursor = db.cursor()
        cursor.execute("""DELETE FROM tokens WHERE token=%(token)s;
        INSERT INTO tokens (token) VALUES (md5(random()::text))  returning token;""",
        {
        'token':token})
        print("cursor.rowcount",cursor.rowcount)
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        newtoken=cursor.fetchone()[0]
        db.commit()
        cursor.close()
  
        return jsonify({'token':newtoken})
    
    @app.route('/invite/<int:boardid>', methods = ['POST'])
    def invite(boardid):  
        token=request.headers.get('Authorization')

        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        if banned:
            return Response(status=403)

        pseudo=request.json.get('pseudo')
        if type(pseudo)!=str:
            return Response(status=400)


        cursor.execute("""
               SELECT invite(%(userid)s,%(pseudo)s,%(boardid)s)
        """,
        {'userid':userid,
        'boardid':boardid,
        'pseudo':pseudo,
        })
        
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        newuserid=cursor.fetchone()[0]
        if newuserid is None or newuserid==userid:
            cursor.close()
            return Response(status=403)
        	
        db.commit()
        
        cursor.close()
  
        return jsonify({'userid':newuserid})


    @app.route('/uninvite/<int:boardid>/<int:invitedid>', methods = ['GET'])
    def uninvite(boardid,invitedid):  
        token=request.headers.get('Authorization')

        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)


        cursor.execute("""
                do $$
        

BEGIN
  IF (select exists(SELECT 1 from board where boardid=%(boardid)s and userid=%(userid)s)) THEN
    DELETE FROM collaboration WHERE boardid=%(boardid)s and invited=%(invitedid)s;
  END IF;
END;

         $$
        """,
        {'userid':userid,
        'boardid':boardid,
        'invitedid':invitedid,
        })
        db.commit()
        cursor.close()
  
        return Response(status=200)

    @app.route('/listinvited/<int:boardid>', methods = ['GET'])
    def listinvited(boardid):  

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        cursor.execute("""select * from listinvited(%(userid)s,%(boardid)s) LIMIT 1
        """,
        {'userid':userid,
        'boardid':boardid,  })
        fetched=cursor.fetchall()
        cursor.close()
        result=[]
        for line in fetched:
            result.append({'userid':line[0],'pseudo':line[1]})
        print(result)
        return jsonify(result)
  



    @app.route('/reportboard/<int:boardid>', methods = ['POST'])
    def reportboard(boardid,cell=None):  
        token=request.headers.get('Authorization')
        print(request.json)
        reason=request.json.get('reason')
        if type(reason)!=int:
            return Response(status=401)
        detail=request.json.get('detail')
        if detail==None:
            detail=''
        elif type(detail) != str :
            return Response(status=402)


        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=403)
        if banned:
            return Response(status=403)



        cursor.execute("""
                
INSERT INTO report (ressourceid,reporter,reported,reason,detail) VALUES (%(ressourceid)s,%(userid)s,(SELECT userid FROM board where boardid=%(boardid)s LIMIT 1),%(reason)s,%(detail)s)

        """,
        {'userid':userid,
        'boardid':boardid,
        'ressourceid':str(boardid)+':'+str(cell),
        'reason':reason,
        'detail':detail
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
        return Response(status=200)

    @app.route('/quitboard/<int:boardid>', methods = ['GET'])
    def quitboard(boardid): 
        token=request.headers.get('Authorization')


        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)


        cursor.execute("""
                
DELETE FROM collaboration WHERE boardid=%(boardid)s and invited=%(userid)s;
        """,
        {'userid':userid,
        'boardid':boardid,
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
        return Response(status=200)

    @app.route('/reportcell/<int:boardid>/<int:cellid>', methods = ['POST'])
    def reportcell(boardid,cellid):  
        return reportboard(boardid,cellid)

    @app.route('/reportuser/<int:reportuserid>', methods = ['POST'])
    def reportuser(reportuserid): 
        token=request.headers.get('Authorization')
        reason=request.json.get('reason')
        if type(reason)!=int:
            return Response(status=400)
        detail=request.json.get('detail')
        if detail==None:
            detail=''
        elif type(detail) != str :
            return Response(status=402)

        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        if banned:
            return Response(status=403)

        #todo:check if user exists?
        cursor.execute("""
 INSERT INTO report (reporter,reported,reason,detail) VALUES (%(userid)s,%(reportuserid)s,%(reason)s,%(detail)s)
         """,
        {'userid':userid,
        'reportuserid':reportuserid,
        'reason':reason,
        'detail':detail
        })
        if cursor.rowcount!=1:
            cursor.close()
            return Response(status=403)
        db.commit()
        cursor.close()
        return Response(status=200)

    @app.route('/myinvitations', methods = ['GET'])
    def myinvitations():  

        token = request.headers.get('Authorization')
        db = get_db()
        cursor = db.cursor()
        userid,banned=useridFromToken(token,cursor)
        if userid is None:
            return Response(status=400)
        cursor.execute("""
SELECT board.boardid,board.title from board,collaboration where collaboration.invited=%(userid)s and board.boardid=collaboration.boardid;
        """,
        {'userid':userid, })
        fetched=cursor.fetchall()
        cursor.close()
        result=[]
        for line in fetched:
            result.append({'boardid':line[0],'title':line[1]})
        
        return jsonify(result)

    return app

app = create_app()
#app.run(host="0.0.0.0",debug=True)
