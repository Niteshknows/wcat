#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");
let arguments = process.argv.slice(2);

let flags = [];
let filenames= [];
let secondaryArguments = [];

for(let i of arguments){
    if(i[0]=='-'){
        flags.push(i);
    } else if(i[0]=="$"){
        secondaryArguments.push(i.slice(1));
    }
     else {
        filenames.push(i);
    }
}

for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8");
    
    for(let flag of flags){
        if(flag == "-rs") {
            fileData = removeAll(fileData," ");
        }
        if(flag == "-rn") {
            fileData = removeAll(fileData, "\n")
        }

        if(flag == "-rsc"){
            for(let secondaryArgument of secondaryArguments){
                fileData = removeAll(fileData,secondaryArgument);
            }
        }
        if(flag=="-s"){
         let data= addSeq(fileData);
         console.log(data);
        }
        if(flag=="-sn"){
            let f = addseqton(fileData);
            console.log(f);
        }
        if(flag=="-cv"){  //count vowels   
           let count = countv(fileData);
           console.log(count);
        }        

        
    }
}

function countv(content){  
    let count=0;
    for(let i=0;i<content.length;i++){
      let ch = content[i];
      
      if(ch=='a' || ch =='A' || ch =='e' || ch =='E' || ch=='I' || ch=='i' || ch=='O' || ch=='o' ||ch =='U' || ch=='u'){
       count++;
      }
       
    }
    return count;
}


function removeAll(content, removalData){
    return content.split(removalData).join("");
}
function addSeq(content){
   let contentArr = content.split("\r\n");
   for(let i=0; i<contentArr.length;i++){
       contentArr[i] = (i+1)+" "+contentArr[i];
   }             return contentArr;
}

function addseqton(content){
    let contentArr = content.split("\r\n");
    let count =1;
    for(let i=0; i<contentArr.length;i++){
        if(contentArr[i]!=""){
        contentArr[i] = count+" "+contentArr[i];
        count++;}
    }
                 return contentArr;
 }
