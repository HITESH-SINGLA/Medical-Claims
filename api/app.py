from flask import Flask , request, jsonify
import json
import database
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
import random
import secrets

user_name = 'aditya1024'
password = 'onepieceisreal'

app = Flask(__name__)
CORS(app)

app.secret_key = secrets.token_hex(16)


app.config['SECRET_KEY'] = 'secret-key'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'guptaaditya70993@gmail.com'
app.config['MAIL_PASSWORD'] = 'nxzfkzusithjjfsj'

mail = Mail(app)

otp_dict = {}

@app.route('/')
def home():
    return "onepieceisreal"

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    email = request.json['email']
    otp = request.json['otp']
    stored_otp = otp_dict.get(email)

    conn = database.get_database(user_name, password)
    mycursor = conn.cursor()
    email_id = '\'' + email + '\''
    q1= f"select count(*) from login where email = {email_id}"
    print(q1)
    mycursor.execute(q1)
    isexist = mycursor.fetchone()
    print(isexist[0])

    if(isexist[0] == 0):
        return jsonify({'message': 'User does not exist.'}), 401
    if stored_otp is None:
        otp = str(random.randint(1000, 9999))
        print(otp)
        otp_dict[email] = otp
        msg = Message('Login OTP', sender='guptaaditya70993@gmail.com', recipients=[email])
        msg.body = f'Your OTP is {otp}.'
        mail.send(msg)
        return jsonify({'message': 'An OTP has been sent to your email.'}), 201
    elif otp != stored_otp:
        return jsonify({'message': 'Invalid OTP.'}), 401
    else:
        del otp_dict[email]
        return jsonify({'message': 'Login successful.'}), 200


@app.route('/basicDetails', methods=['GET', 'POST'])
@cross_origin()
def basicDetails():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user"]["email"] + '\''
        data = '\'' + json.dumps(request_data) + '\''
        print('email: ', email_id)

        q1= f"Select count(*) from basicdetails where user_id = {email_id}"

        mycursor.execute(q1)
        isexist = mycursor.fetchone()
        # print('isexist', isexist[0])

        if(isexist[0] == 0):
            query = f"INSERT INTO basicdetails(user_id, data) VALUES({email_id}, {data})"
            print('inside if')
        else:
            query = f"UPDATE basicdetails SET data ={data} WHERE user_id = {email_id} "
            print('inside else')

        mycursor.execute(query)

        conn.commit()

        mycursor.close()
        conn.close()

        return {"status": "ok","result": "basic details updated"}

    return {"status": "basicDetails working"}


@app.route('/getbasicDetails', methods=['GET', 'POST'])
@cross_origin()
def getbasicDetails():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user"]["email"] + '\''

        print('email: ', email_id)

        q1 = f"Select count(*) from basicdetails where user_id = {email_id}"

        mycursor.execute(q1)
        isexist = mycursor.fetchone()
        print('isexist', isexist[0])

        if (isexist[0] == 1):
            query= f"Select data from basicdetails where user_id = {email_id}"
            mycursor.execute(query)
            result = mycursor.fetchone()
        else:
            result = ('{"user": {"address": "", "email": "", "employee_code_no": "", "martial_status": "", "name": "", "partner_place": "", "pay": ""}}',)
        # print('result line 82',result)
        # print(json.loads(result[0]))

        mycursor.close()
        conn.close()

        return {"status": "ok","result": json.loads(result[0])}

    return {"status": "basicDetails working"}


@app.route('/check_user', methods=['GET', 'POST'])
@cross_origin()
def check_user():
    if (request.method == 'POST'):
        request_data = request.get_json()

        if (request_data == None):
            print('user is null')

        # print(request_data)
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        if (request_data["user"]["page_no"] == 1):
            page1 = '\'' + json.dumps(request_data) + '\''
            page2 = '\'' + "" + '\''
            page3 = '\'' + "" + '\''
            page4 = '\'' + "" + '\''
            status = '\'' + "PENDING" + '\''
            email = '\'' + request_data["user"]["email"] + '\''
            query = f"INSERT INTO application(user_id, page1, page2, page3, page4, pharmacist, medical_officer, da_jao, ao, sr_ao, registrar, director) VALUES({email}, {page1}, {page2}, {page3}, {page4}, {status}, {status}, {status}, {status}, {status}, {status}, {status})"
            print("\nQUERY:=>\n")
            print(query)

            mycursor.execute(query)
            # result = mycursor.fetchone()
            conn.commit()
            # print(type(result))
            # print(result[0])
            mycursor.close()
            conn.close()

        else:
            pg = "page" + str(request_data["user"]["page_no"])
            page = '\'' + json.dumps(request_data) + '\''
            email = '\'' + request_data["user"]["email"] + '\''
            print(request_data["user"]["email"])

            id_query = f"select application_id from application where user_id = {email} order by application_id DESC"
            mycursor.execute(id_query)
            id_result = mycursor.fetchall()
            print('id result = ', id_result)
            recent_id = id_result[0][0]
            print('recentid = ', recent_id)

            query = f"UPDATE application SET {pg} = {page} WHERE user_id = {email} AND application_id = {recent_id}"

            print("\nQUERY:=>\n")
            print(query)

            mycursor.execute(query)
            conn.commit()
            mycursor.close()
            conn.close()

    return {"status": "this is get request"}

@app.route('/updateStatus', methods=['GET', 'POST'])
@cross_origin()
def updateStatus():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in request data')

        # print(request_data)
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        id = '\'' + request_data["authorityUser"]["application_id"] + '\''
        email_id = '\'' + request_data["authorityUser"]["email"] + '\''
        applicationStatus = '\'' + request_data["authorityUser"]["applicationStatus"] + '\''
        remarks = '\'' + request_data["authorityUser"]["remarks"] + '\''

        print('applicationStatus: ',applicationStatus)


        if (email_id == '\''+'pharmacistxyz901@gmail.com'+ '\''):
            query = f"UPDATE application SET pharmacist = {applicationStatus} , pharmacist_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'medical.officer.901@gmail.com'+'\''):
            query = f"UPDATE application SET medical_officer = {applicationStatus} , medical_officer_remarks = {remarks} WHERE application_id  = {id}"
            print("assignment of query successful")

        elif (email_id  == '\''+'junioracc.xyz901@gmail.com'+'\''):
            query = f"UPDATE application SET da_jao = {applicationStatus} , da_jao_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'assessing.officer.901@gmail.com'+'\''):
            query = f"UPDATE application SET ao = {applicationStatus} , ao_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'senior.audit.901@gmail.com'+'\''):
            query = f"UPDATE application SET sr_ao = {applicationStatus} , sr_ao_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'registrar.officer.901@gmail.com'+'\''):
            query = f"UPDATE application SET registrar = {applicationStatus} , registrar_remarks = {remarks} WHERE application_id  = {id}"
        elif (email_id  == '\''+'tempusageww3@gmail.com'+'\''):
            query = f"UPDATE application SET director = {applicationStatus} , director_remarks = {remarks} WHERE application_id  = {id}"

        print("\nQUERY:=>\n")
        print(query)

        mycursor.execute(query)
        conn.commit()
        mycursor.close()
        conn.close()

    return {"status": "this is updateStatus get request"}


@app.route('/getData', methods=['GET', 'POST'])
@cross_origin()
def getData():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('user is null')

        # print(request_data)
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''


        query = f"select * from application where user_id = {email_id} order by application_id asc"

        print("\nQUERY:=>\n")
        print(query)

        mycursor.execute(query)
        result = mycursor.fetchall()
        # print(type(result))
        # print(json.loads(result[-1][2]))
        # print(json.loads(result[-1][3]))
        # print(json.loads(result[-1][4]))
        # print(json.loads(result[-1][5]))
        # print(type(result[-1][4]))
        mycursor.close()
        conn.close()

        return {"status": "ok" , "page1": json.loads(result[-1][2]), "page2":json.loads(result[-1][3]) ,"page3":json.loads(result[-1][4]) , "page4":json.loads(result[-1][5])}



    return {"status":"getdata working"}


@app.route('/getApplicationId', methods=['GET', 'POST'])
@cross_origin()
def getApplicationId():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["currentUser"]["email"] + '\''
        print('email: ', email_id)
        query = f"select application_id from application where user_id = {email_id} order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getApplicationId working"}

@app.route('/getallApplicationIdFromPharmacist', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdFromPharmacist():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        #print("qresult")
        print('email: ', email_id)
        #print("sresult")
        query = f"select application_id from application where pharmacist = 'approved' "
        #print("wresult")
        mycursor.execute(query)
        #print("wresult")
        result = mycursor.fetchall()
        result_arr = []
        #print("result")
        # print(result)
        for item in result:
            result_arr.append([str(item[0]), item[4]])
        # print(result_arr)

        return {"status": "ok","result": result_arr}

    return {"status": "getApplicationIdFromPharmacist working"}


@app.route('/getallApplicationIdFromMedicalOff', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdFromMedicalOff():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where medical_officer='approved' "
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromMedicalOff working"}


@app.route('/getallApplicationIdFromAccSec', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdFromAccSec():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where accountsection='approved' "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromAccSec working"}



@app.route('/getallApplicationIdFromDAorJAO', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdFromDAorJAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where da_jao='approved' "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromDAorJAO working"}



@app.route('/getallApplicationIdFromAO', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdFromAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where ao='approved' "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromAO working"}


@app.route('/getallApplicationIdFromSrAo', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdFromSrAo():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where sr_ao='approved' "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]),item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromSrAo working"}

@app.route('/showApplicationId/<id>', methods=['GET', 'POST'])
@cross_origin()
def showApplicationId(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()
        query = f"select * from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        # print('showapplication result',result)
        return {"status": "ok", "page1": json.loads(result[2]), "page2": json.loads(result[3]),
                "page3": json.loads(result[4]), "page4": json.loads(result[5])}

    return {"status": "ok", "result": "showApplication is working"}


@app.route('/getallApplicationId', methods=['GET', 'POST'])  # this will fetch all unseen applications to pharmacist in his home page
@cross_origin()
def getallApplicationId():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where pharmacist <> 'approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[6]])

        return {"status": "ok", "result": result_arr}

    return {"status": "getallapplicationId working"}

import ast

@app.route('/getallApplicationIdForHome',
          methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdForHome():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["email"] + '\''
        print('email: ', email_id)
        query = f"select * from application where user_id = {email_id} and registrar<>'approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[6], item[8], item[10], item[16]])

        query = f"select * from application where user_id = {email_id} and registrar='approved' and director<>'approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        query = f"select application_id,table_data from data"
        mycursor.execute(query)
        result_meta = mycursor.fetchall()
        leng = len(result_meta)
        letsdic = {}
        for i in range(leng):
            ajso = json.loads(result_meta[i][1])
            amntt = ajso["total2"]
            if (amntt == ""):
                amntt = "0"
            amntt = int(amntt)
            letsdic[result_meta[i][0]] = amntt

        for item in result:
            p = item[0]
            if (letsdic[p] >= 200000):
                result_arr.append([str(item[0]), str(item[4]), item[6], item[8], item[10], item[16]])
        # print("---------------------------")
        # print(result_arr)
        # print("----------------------------")
        return {"status": "ok", "result": result_arr}

    return {"status": "getallApplicationIdForHome working"}


@app.route('/getallApprovedApplicationId', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationId():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["email"] + '\''
        print('email: ', email_id)
        query = f"select * from application where user_id = {email_id} and director='approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        query = f"select * from application where user_id = {email_id} and registrar='approved' and director<>'approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        query = f"select application_id,table_data from data"
        mycursor.execute(query)
        result_meta = mycursor.fetchall()
        leng = len(result_meta)
        letsdic = {}
        for i in range(leng):
            ajso = json.loads(result_meta[i][1])
            amntt = ajso["total2"]
            if (amntt == ""):
                amntt = "0"
            amntt = int(amntt)
            letsdic[result_meta[i][0]] = amntt

        for item in result:
            p = item[0]
            if (letsdic[p] < 200000):
                result_arr.append([str(item[0]), item[4]])
        return {"status": "ok", "result": result_arr}

    return {"status": "getallApprovedApplicationId working"}


@app.route('/getallApprovedApplicationIdFromPharmacist', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromPharmacist():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        #print("qresult")
        print('email: ', email_id)
        #print("sresult")
        query = f"select * from application where pharmacist = 'approved' order by application_id asc"
        #print("wresult")
        mycursor.execute(query)
        #print("wresult")
        result = mycursor.fetchall()
        result_arr = []
        #print("result")
        # print(result)
        for item in result:
            result_arr.append([str(item[0]), item[4]])
        # print(result_arr)

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromPharmacist working"}


@app.route('/getallApplicationIdForMedicalOff', methods=['GET', 'POST'])  # this will fetch all  application  unseen by medical officer to his home page
@cross_origin()
def getallApplicationIdForMedicalOff():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        print('email: ', email_id)
        query = f"select * from application where pharmacist = 'approved' and medical_officer <> 'approved' order by application_id asc "
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        # print(result)
        for item in result:
            result_arr.append([str(item[0]), item[4], item[8]])
        # print(result_arr)

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdForMedicalOff working"}


@app.route('/getallApprovedApplicationIdFromMedicalOff', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromMedicalOff():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where medical_officer='approved' order by application_id asc "
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromMedicalOff working"}


@app.route('/getallApplicationIdForDAorJAO', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdForDAorJAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where medical_officer = 'approved' and da_jao <> 'approved' order by application_id asc "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[10]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdForDAorJAO working"}


@app.route('/getallApprovedApplicationIdFromDAorJAO', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromDAorJAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where da_jao = 'approved' order by application_id asc "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[10]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromDAorJAO working"}


@app.route('/getallApplicationIdForAO', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdForAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where da_jao='approved' and ao <> 'approved' order by application_id asc "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[12]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdForAO working"}


@app.route('/getallApprovedApplicationIdFromAO', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where ao='approved' order by application_id asc "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[12]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromAO working"}


@app.route('/getallApplicationIdForSrAO', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdForSrAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where ao='approved' and sr_ao <> 'approved' order by application_id asc "
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        leng=len(result)
        for i in range(leng):
            ajso=json.loads(result[i][4])
            amntt=ajso["user"]["netAmntClaimed"]
            if(amntt==""):
                amntt="0"
            amntt=int(amntt)
            if(amntt>=50000):
                result_arr.append([result[i][0], result[i][4]])
        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdForSrAO working"}



@app.route('/getallApprovedApplicationIdFromSrAO', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromSrAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where sr_ao='approved' order by application_id asc "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromSrAO working"}



@app.route('/getallApplicationIdForRegistrar', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdForRegistrar():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        # amnt=int(amnt)
        # if amnt>=50000:
        query = f"select * from application where ao='approved' and registrar<>'approved' order by application_id asc"
        #else:
        #    query = f"select application_id from application where ao='approved'"
        mycursor.execute(query)
        result = mycursor.fetchall()
        #else:
        #    query = f"select application_id from application where ao='approved'"

        result_arr = []
        leng=len(result)
        for i in range(leng):
            ajso=json.loads(result[i][4])
            amntt=ajso["user"]["netAmntClaimed"]
            if(amntt==""):
                amntt="0"
            amntt=int(amntt)
            if(amntt<50000):
                result_arr.append([result[i][0],result[i][4], result[i][16]])
        query = f"select * from application where sr_ao='approved'and registrar<>'approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        leng=len(result)
        for i in range(leng):
            ajso=json.loads(result[i][4])
            amntt=ajso["user"]["netAmntClaimed"]
            if(amntt==""):
                amntt="0"
            amntt=int(amntt)
            result_arr.append([result[i][0], result[i][4], result[i][16]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdForRegistrar working"}


@app.route('/getallApprovedApplicationIdFromRegistrar', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromRegistrar():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where registrar='approved' order by application_id asc"

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4], item[16]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromRegistrar working"}



@app.route('/getallApplicationIdForDirector', methods=['GET', 'POST'])
@cross_origin()
def getallApplicationIdForDirector():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where registrar='approved' and director<>'approved' order by application_id asc"
        mycursor.execute(query)
        result = mycursor.fetchall()
        query = f"select application_id,table_data from data"
        mycursor.execute(query)
        result_data = mycursor.fetchall()
        leng=len(result_data)
        letsdic={}
        for i in range(leng):
            ajso=json.loads(result_data[i][1])
            amntt=ajso["total2"]
            if(amntt==""):
                amntt="0"
            amntt=int(amntt)
            letsdic[result_data[i][0]]=amntt


        result_arr = []
        for item in result:
            p=item[0]
            if(letsdic[p]>=200000):
                result_arr.append([str(item[0]), item[4]])


        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdForDirector working"}



@app.route('/getallApprovedApplicationIdFromDirector', methods=['GET', 'POST'])
@cross_origin()
def getallApprovedApplicationIdFromDirector():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where director='approved' order by application_id asc "

        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append([str(item[0]), item[4]])

        return {"status": "ok","result": result_arr}

    return {"status": "getallApprovedApplicationIdFromDirector working"}


@app.route('/showallApplicationId/<id>', methods=['GET', 'POST'])
@cross_origin()
def showallApplicationId(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return
        #id = '\'' + str(id) + '\''
        email_id = '\'' + request_data["user_data"]["email"] + '\''
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()
        query = f"select * from application where application_id = {id}"
        print('line864',query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        # print('line 867 result',result)
        return {"status": "ok", "page1": json.loads(result[2]), "page2": json.loads(result[3]),
                "page3": json.loads(result[4]), "page4": json.loads(result[5])}

    return {"status": "ok", "result": "showallapplication is working"}


@app.route('/showApplicationIdStatus/<id>', methods=['GET', 'POST'])
@cross_origin()
def showApplicationIdStatus(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return
        # id = '\'' + str(id) + '\''
        email_id = '\'' + request_data["user_data"]["email"] + '\''
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()
        authority="Pharmacist approval is still pending"
        authority_remarks=""
        isHold = "no"
        query = f"select pharmacist from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select pharmacist_remarks from application where application_id= {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()
        print(result[0])
        print("remarks:",result1[0])
        if(result[0]=="approved"):
            authority="Pharmacist has approved your application."
            authority_remarks=result1[0]
            isHold = "no"
        if(result[0]=="hold"):
            authority = "Pharmacist has put your application on hold." #user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "Pharmacist has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        query = f"select medical_officer from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select medical_officer_remarks from application where application_id= {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="Medical Officer has approved your application."
            authority_remarks=result1[0]
            isHold = "no"
        if (result[0] == "hold"):
            authority = "Medical Officer has put your application on hold."  # user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "Medical Officer has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        query = f"select da_jao from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select da_jao_remarks from application where application_id= {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()
        if (result[0] == "approved"):
            authority = "D.A./JAO has approved your application."
            authority_remarks = result1[0]
            isHold = "no"
        if (result[0] == "hold"):
            authority = "D.A./JAO has put your application on hold."  # user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "D.A./JAO has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        query = f"select ao from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select ao_remarks from application where application_id= {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()
        if (result[0] == "approved"):
            authority = "A.O. has approved your application."
            authority_remarks = result1[0]
            isHold = "no"
        if (result[0] == "hold"):
            authority = "A.O. has put your application on hold."  # user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "A.O. has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        query = f"select sr_ao from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select sr_ao_remarks from application where application_id= {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()
        if (result[0] == "approved"):
            authority = "Sr.A.O.(Audit) has approved your application."
            authority_remarks = result1[0]
            isHold = "no"
        if (result[0] == "hold"):
            authority = "Sr.A.O.(Audit) has put your application on hold."  # user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "Sr.A.O.(Audit) has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        query = f"select registrar from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select registrar_remarks from application where application_id= {id} and user_id = {email_id}"
        # print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()
        if (result[0] == "approved"):
            authority = "Registrar has approved your application."
            authority_remarks = result1[0]
            isHold = "no"
        if (result[0] == "hold"):
            authority = "Registrar has put your application on hold."  # user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "Registrar has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        query = f"select director from application where application_id = {id} and user_id = {email_id}"
        query_for_remarks = f"select director_remarks from application where application_id= {id} and user_id = {email_id}"
        # print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        mycursor.execute(query_for_remarks)
        result1 = mycursor.fetchone()

        if (result[0] == "approved"):
            authority = "Director has approved your application."
            authority_remarks = result1[0]
            isHold = "no"
        if (result[0] == "hold"):
            authority = "Director has put your application on hold."  # user will be able to edit the application in this case
            authority_remarks = result1[0]
            isHold = "yes"
        if (result[0] == "rejected"):
            authority = "Director has rejected your application"
            authority_remarks = result1[0]
            isHold = "no"

        return {"status": "ok", "current_auth":authority,"current_auth_remarks":authority_remarks, "isHold":isHold}

    return {"status": "ok", "result": "showApplicationIdStatus is working"}


@app.route('/update_data_from_accountsection',methods=['GET','POST'])
@cross_origin()
def update_data_from_accountsection():
        if(request.method == 'POST'):
            request_data = request.get_json()
            if(request_data == None):
                print('Error in request data')

            # print(request_data)
            conn = database.get_database(user_name,password)
            mycursor = conn.cursor()

            # print(request_data["user"])
            # print(type(request_data["user"]))

            id = '\'' + request_data["user"]["application_id"] + '\''
            table_data= '\''+ json.dumps(request_data["user"]) +'\''

            query1 =f"select count(*) from data where application_id ={id}"
            mycursor.execute(query1)
            result = mycursor.fetchone()
            conn.commit()
            if(result[0]== 0):
                query = f"INSERT INTO data (application_id , table_data) values ({id},{table_data})"
            else:
                query = f"UPDATE data SET table_data={table_data} where application_id = {id}"
            print("query:=>\n")
            print(query)

            mycursor.execute(query)
            conn.commit()
            mycursor.close()
            conn.close()
        return{"status":"update_data_from_accountsection worked fine"}


@app.route('/getData_from_accounttable/<id>', methods=['GET', 'POST'])
@cross_origin()
def getData_from_accounttable(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('user is null')

        print(request_data)
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        #email_id = '\'' + request_data["user"]["email"] + '\''
        id = '\'' + str(id) + '\''
        query = f"select * from data where application_id = {id}"
        print("\nQUERY:=>\n")
        print(query)

        mycursor.execute(query)
        result = mycursor.fetchone()
        # print("line 140",result)
        # print(type(result[1]))
        # print(json.loads(result[1]))
        mycursor.close()
        conn.close()

        return {"status": "ok" , "user": json.loads(result[1]) }



    return {"status":"getData from account section table working"}


@app.route("/resubmitApplication", methods = ["GET", "POST"])
@cross_origin()
def resubmitApplication():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in request data')

        # print(request_data)
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        application_id = request_data["application_id"]
        page1 = '\'' + json.dumps(request_data["page1"]) + '\''
        page2 = '\'' + json.dumps(request_data["page2"]) + '\''
        page3 = '\'' + json.dumps(request_data["page3"]) + '\''
        page4 = '\'' + json.dumps(request_data["page4"]) + '\''

        query = f"UPDATE application SET page1 = {page1}, page2 = {page2}, page3 = {page3}, page4 = {page4} WHERE application_id = {application_id}"

        query2 = "update application set"

        print("\nQUERY:=>\n")
        print(query)

        mycursor.execute(query)
        conn.commit()
        mycursor.close()
        conn.close()

        return {"status": "ok", "resubmit":"successful"}

    return {"status": "this is resubmitApplication get request"}





@app.route("/get_application_id", methods=["GET", "POST"])
@cross_origin()
def get_application_id():
    if (request.method == "POST"):
        print("DEBUG:480")
        request_data = request.get_json()
        email = '\'' + request_data["email1"] + '\''

        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()

        id_query = f"select application_id from application where user_id = {email} order by application_id DESC"
        mycursor.execute(id_query)
        id_result = mycursor.fetchall()
        print('id result = ', id_result)
        recent_id = id_result[0][0]
        print('recentid = ', recent_id)

        mycursor.close()
        conn.close()

    return {"status": "ok", "id": str(recent_id)}



@app.route('/getRemarks/<id>', methods=['GET', 'POST'])
@cross_origin()
def getRemarks(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return
        #id = '\'' + str(id) + '\''
        email_id =request_data["authorityUser"]["email"]
        print(type(email_id),"\n")
        print("email:", email_id , "\n")
        conn = database.get_database(user_name, password)
        mycursor = conn.cursor()
        if(email_id == 'pharmacistxyz901@gmail.com'):
            query = f"select pharmacist_remarks from application where application_id = {id}"
        elif(email_id == 'medical.officer.901@gmail.com'):
            query = f"select medical_officer_remarks from application where application_id = {id}"
        elif(email_id == 'junioracc.xyz901@gmail.com'):
            query = f"select da_jao_remarks from application where application_id = {id}"
        elif(email_id == 'assessing.officer.901@gmail.com'):
            query = f"select ao_remarks from application where application_id = {id}"
        elif(email_id == 'senior.audit.901@gmail.com'):
            query = f"select sr_ao_remarks from application where application_id = {id}"
        elif(email_id == 'registrar.officer.901@gmail.com'):
            query = f"select registrar_remarks from application where application_id = {id}"
        elif(email_id == 'tempusageww3@gmail.com'):
            query = f"select director_remarks from application where application_id = {id}"
        print("line 990:",query)
        mycursor.execute(query)
        authority_remarks = mycursor.fetchone()
        conn.commit()
        mycursor.close()
        conn.close()
        return {"status": "ok","current_auth_remarks":authority_remarks}

    return {"status": "ok", "result": "getRemarks is working"}


if __name__ == "__main__":
    app.debug = True
    app.run()
