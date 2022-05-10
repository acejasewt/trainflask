#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 21 00:25:13 2021

@author: chiuchenju
"""
"""大多數縣市"""
def crawler(web):
    import urllib.request as req
    url=str(web)
    with req.urlopen(url) as response:   
        data=response.read().decode("utf-8")
    
    import bs4
    root=bs4.BeautifulSoup(data,"html.parser")
    titles=root.find_all("h2",class_="entry-title")
    title0=[]
    for title in titles:
        if title.a!= None:
            title0.append(title.a.string)
    
    
    links=root.find_all("a",class_="entry-title-link")
    link0=[]
    for link in links:
        href=link.get("href")
        link0.append(href)
    return title0,link0

A,a=crawler("https://yoke918.com/category/taiwantravel/taipei/")
B,b=crawler("https://yoke918.com/category/taiwantravel/taoyuan/")
C,c=crawler("https://yoke918.com/tag/%E6%96%B0%E7%AB%B9%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E/")
D,d=crawler("https://yoke918.com/tag/%E8%8B%97%E6%A0%97%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E/")
E,e=crawler("https://yoke918.com/category/taiwantravel/taichung/")
F,f=crawler("https://yoke918.com/category/taiwantravel/nantou/")
G,g=crawler("https://yoke918.com/tag/%E9%9B%B2%E6%9E%97%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E/")
H,h=crawler("https://yoke918.com/category/taiwantravel/tainan/")
I,i=crawler("https://yoke918.com/tag/%E8%8A%B1%E8%93%AE%E6%99%AF%E9%BB%9E/")
J,j=crawler("https://yoke918.com/tag/%e5%8f%b0%e6%9d%b1%e6%97%85%e9%81%8a%e6%99%af%e9%bb%9e/")
K,k=crawler("https://yoke918.com/category/taiwantravel/keelung/")


"""彰化"""
def crawler1(web):
    import urllib.request as req 
    url=str(web)
    with req.urlopen(url) as response:   
        data=response.read().decode("utf-8")
    
    
    import bs4
    root=bs4.BeautifulSoup(data,"html.parser")
    titles=root.find("div",class_="entry-content")
    p=titles.find_all("p")
    a=p[4].find_all("a")
    title0=[]
    link0=[]
    for i in a:
        title=i.text
        title0.append(title)
        href=i.get("href")
        link0.append(href)
    return title0,link0

L,l=crawler1("https://yoke918.com/changhua-daytour/")   


"剩餘縣市"
def crawler2(web):
    import urllib.request as req
    url=str(web)
    with req.urlopen(url) as response:   
        data=response.read().decode("utf-8")
    import bs4
    root=bs4.BeautifulSoup(data,"html.parser")
    titles=root.find("div",class_="entry-content")
    h=titles.find_all("h3")
    a=[]
    b=[]
    for i in h:
      link=i.find("a")
      if link:
        link=link.get("href")
        a.append(i.text)
        b.append(link)
    return a,b

M,m=crawler2("https://yoke918.com/kaohsiung01/")
N,n=crawler2("https://yoke918.com/pingtung/")
O,o=crawler2("https://yoke918.com/ilan-daytour/")
P,p=crawler2("https://yoke918.com/2784/")

    
n=[]
l=[]
def mydict(name,link):
    for i ,j in zip(name,link):
        n.append(i)
        l.append(j)

mydict(A,a)
mydict(B,b)
mydict(C,c)
mydict(D,d)
mydict(E,e)
mydict(F,f)
mydict(G,g)
mydict(H,h)
mydict(I,i)
mydict(J,j)
mydict(K,k)
mydict(L,l)
mydict(M,m)
mydict(N,n)
mydict(O,o)
mydict(P,p)


import pandas as pd
data=pd.DataFrame({"name":n,"link":l})
print(data)







