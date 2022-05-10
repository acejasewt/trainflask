#!/usr/bin/env python
# coding: utf-8

# In[30]:


from flask import Flask, redirect, url_for, render_template, request, session, jsonify,flash
from flask_mysqldb import MySQL
import random, cv2


# In[78]:


#人臉辨識
def facedetect():
    face_cascade =  cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)
    while 1:
        ret,frame = cap.read()
        cv2.imshow('frame',frame)

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, scaleFactor = 1.08, minNeighbors = 5, minSize = (32, 32))
        if len(faces) != 0: 
            if cv2.waitKey(0):
                break

    cap.release()
    cv2.destroyAllWindows()
    return 1


# In[85]:


app = Flask(__name__)

app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "railway"
app.config['JSON_AS_ASCII'] = False
app.secret_key = "jijijijpjpjpjpjpjpjpjp"

mysql = MySQL(app)


# In[86]:


#首頁
@app.route("/")
@app.route("/index",methods=["POST","GET"])
def home():
    if request.method == "GET":
        return render_template("index.html")
    
#車站景點
@app.route("/intro",methods=["POST","GET"])
def intro():
    if request.method == "GET":
        return render_template("intro.html")

#查詢時刻表
@app.route("/booking",methods=["POST","GET"])
def booking():
    if request.method == "GET":
        return render_template("booking.html")
    else:
        dep = request.form["departure"]
        des = request.form["destination"]
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM `schedule` WHERE destination = %s AND departure = %s",(des,dep))
        fetchdata = cur.fetchall()
        cur.close()
        srhdata = []
        content = {}

        for i in fetchdata:
            randfull = random.randint(20,150)
            tmpdep = i[9] if len(i[9])==5 else "0"+i[9]
            tmpdes = i[10] if len(i[10])==5 else "0"+i[10]
            content = {"train_type":i[4],"train_num":i[6],"dep_time":tmpdep,"des_time":tmpdes,"full":randfull,"child":randfull//2,"eld":randfull//2,"remain":random.randint(0,12),"train_id":i[5]}
            srhdata.append(content)
            content = {}
        session["srhres"] = srhdata
        return redirect(url_for("bookingres"))
    
#訂票
@app.route("/book",methods=["POST","GET"])
def rlbook():
    if request.method == "GET":
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM `schedule` WHERE id = %s",(session["trainid"],))
        booktrain = cur.fetchone()
        cur.close()
        tmpdep = booktrain[9] if len(booktrain[9])==5 else "0"+booktrain[9]
        tmpdes = booktrain[10] if len(booktrain[10])==5 else "0"+booktrain[10]
        getbook = {"rlnm":session['realnm'],"date":"2021/06/13","bgtime":tmpdep,"edtime":tmpdes,"train_type":booktrain[4],"train_num":booktrain[6],"dep":booktrain[7],"des":booktrain[8]}
            
        session["getbook"] = getbook
        return render_template("realbooking.html")
    else:
        adult = request.form["adult"]
        eld = request.form["eld"]
        child = request.form["child"]
            
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO journey (id,username,child,adult,elder) VALUES (%s, %s, %s, %s, %s)",(session["trainid"],session["user"],child,adult,eld,))
        mysql.connection.commit()
        return redirect(url_for("bookinghis"))

#查詢結果
@app.route("/bookingres",methods=["POST","GET"])
def bookingres():
    if request.method == "GET":
        return render_template("bookingres.html")
    else:
        if "user" in session:
            idval = request.form["trainid"]
            session["trainid"] = idval
            return redirect(url_for("rlbook"))
        else:
            flash("欲訂票請先登入!")
            return redirect(url_for("login"))
    
#知識王
@app.route("/knowledge",methods=["POST","GET"])
def knowledge():
    if request.method == "GET":
        return render_template("knowledge.html")

#初階測驗
@app.route("/test1",methods=["POST","GET"])
def test1():
    if request.method == "GET":
        return render_template("test1.html")
    
#初階測驗
@app.route("/test2",methods=["POST","GET"])
def test2():
    if request.method == "GET":
        return render_template("test2.html")

#登入
@app.route("/login",methods=["POST","GET"])
def login():
    global fetchdata_user
    
    if "user" not in session:
        if request.method == "GET":
            return render_template("login.html")
        else:
            if "facedetect" in session:
                if session["facedetect"]:
                    user = request.form["usrname"]
                    password = request.form["usrpw"]

                    cur = mysql.connection.cursor()
                    cur.execute("SELECT * FROM `userinfo` WHERE username = %s",(user,))
                    fetchdata_user = cur.fetchone()
                    cur.close()

                    if fetchdata_user :
                        if password == fetchdata_user[1]:
                            session['user'] = user
                            session['pass'] = fetchdata_user[1]
                            session['realnm'] = fetchdata_user[2]
                            session['mail'] = fetchdata_user[3]
                            session['phone'] = fetchdata_user[4]

                            return redirect(url_for("home"))
                        else:
                            flash("密碼輸入錯誤")
                    else:
                        flash("使用者名稱錯誤!")
            else:
                flash("尚未逕行人臉辨識或辨識失敗")
            return redirect(url_for("login"))
    else:
        return redirect(url_for("home"))
    
#人臉辨識
@app.route("/facedetect")
def face():
    if facedetect():
        flash("人臉辨識成功")
        session["facedetect"] = 1
    else:
        flash("人臉辨識失敗")
        session["facedetect"] = 0
    return redirect(url_for("login"))

#註冊
@app.route("/register",methods=["POST","GET"])
def register():
    if "user" not in session:
        if request.method == "GET":
            return render_template("register.html")
        else:
            mail = request.form["mail"]

            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM `userinfo` WHERE mail = %s",(mail,))
            check_mail = cur.fetchone()
            cur.close()
            if check_mail:
                flash("信箱已被使用!")
                return redirect(url_for("register"))
            else:
                usr = request.form['usrname']
                cur = mysql.connection.cursor()
                cur.execute("SELECT * FROM `userinfo` WHERE username = %s",(usr,))
                check_usr = cur.fetchone()
                cur.close()
                if check_usr:
                    flash("名稱已被使用!")
                    return redirect(url_for("register"))
                else:
                    pw = request.form["usrpw"]
                    checkpw = request.form["checkpw"]
                    if pw == checkpw:
                        usrnm = request.form["realname"]
                        phone = request.form["phone"]
                        cur = mysql.connection.cursor()
                        cur.execute("INSERT INTO userinfo (username,password,real_name,mail,phone) VALUES (%s, %s, %s, %s, %s)",(usr,pw,usrnm,mail,phone,))
                        mysql.connection.commit()

                        return render_template("login.html")
                    else:
                        flash("密碼驗證不正確!")
                        return redirect(url_for("register"))
    else:
        return redirect(url_for("home"))

#帳戶總覽
@app.route("/overview")
def oveview():
    if "user" in session:
        if "bookhis" not in session:
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM `journey` WHERE username = %s",(session["user"],))
            booking_data = cur.fetchall()
            bookinfo = []
            tmpdata = {}
            for i in booking_data:
                cur.execute("SELECT * FROM `schedule` WHERE id = %s",(i[0],))
                train_info = cur.fetchone()
                tmpdep = train_info[9] if len(train_info[9])==5 else "0"+train_info[9]
                tmpdes = train_info[10] if len(train_info[10])==5 else "0"+train_info[10]
                tmpdata = {"dep":train_info[7],"des":train_info[8],"dep_time":tmpdep,"dep_time":tmpdep,"des_time":tmpdes,"train_type":train_info[4],"full":i[3],"child":i[2],"eld":i[4]}
                bookinfo.append(tmpdata)
            cur.close()
            session["bookhis"] = bookinfo
        return render_template("account_overview.html")
    else:
        return redirect(url_for("home"))

#訂票紀錄
@app.route("/bookinghis",methods=["POST","GET"])
def bookinghis():
    if "user" in session:
        if request.method == "GET":
            if "bookhis" not in session:
                cur = mysql.connection.cursor()
                cur.execute("SELECT * FROM `journey` WHERE username = %s",(session["user"],))
                booking_data = cur.fetchall()
                bookinfo = []
                tmpdata = {}
                for i in booking_data:
                    cur.execute("SELECT * FROM `schedule` WHERE id = %s",(i[0],))
                    train_info = cur.fetchone()
                    tmpdep = train_info[9] if len(train_info[9])==5 else "0"+train_info[9]
                    tmpdes = train_info[10] if len(train_info[10])==5 else "0"+train_info[10]
                    tmpdata = {"dep":train_info[7],"des":train_info[8],"dep_time":tmpdep,"dep_time":tmpdep,"des_time":tmpdes,"train_type":train_info[4],"full":i[3],"child":i[2],"eld":i[4]}
                    bookinfo.append(tmpdata)
                cur.close()
                session["bookhis"] = bookinfo
            return render_template("bookinghis.html")
    else:
        return redirect(url_for("home"))

#修改個資
@app.route("/change",methods=["POST","GET"])
def change():
    if "user" in session:
        if request.method == "GET":
            return render_template("change.html")
        else:
            tmppw = request.form["pw"] if request.form["pw"] != "" else fetchdata_user[1]
            tmpcheckpw = request.form["repw"] if request.form["repw"] != "" else fetchdata_user[1]
            tmprlnm = request.form["rlnm"] if request.form["rlnm"] != "" else fetchdata_user[2]
            tmpmail = request.form["mail"] if request.form["mail"] != "" else fetchdata_user[3]
            tmpphone = request.form["phone"] if request.form["phone"] != "" else fetchdata_user[4]
            
            if tmppw == tmpcheckpw:
                cur = mysql.connection.cursor()
                cur.execute("UPDATE `userinfo` SET password = %s, real_name = %s, mail = %s, phone = %s WHERE username = %s",(tmppw,tmprlnm,tmpmail,tmpphone,fetchdata_user[0],))
                mysql.connection.commit()
                tmpusr = request.form["usrname"] if request.form["usrname"] != "" else fetchdata_user[0]
                cur = mysql.connection.cursor()
                cur.execute("UPDATE `userinfo` SET username = %s WHERE mail = %s",(tmpusr,tmpmail,))
                mysql.connection.commit()
                session['user'] = tmpusr
                session['pass'] = tmppw
                session['realnm'] = tmprlnm
                session['mail'] = tmpmail
                session['phone'] = tmpphone
                flash("修改完成")
            else:
                flash("密碼驗證不正確!")
            return redirect(url_for("change"))
    else:
        return redirect(url_for("home"))

#登出
@app.route("/logout")
def logout():
    if "user" in session:
        session.pop("user",None)
        session.pop("msg",None)
        session.pop("realnm",None)
        session.pop("mail",None)
        session.pop("phone",None)
        session.pop("srhres",None)
        session.pop("bookhis",None)
        session.pop("facedetect",None)
        session.pop("getbook",None)
        session.pop("trainid",None)
    return redirect(url_for("home"))


# In[87]:


if __name__ == '__main__':
    app.run()


# In[ ]:




