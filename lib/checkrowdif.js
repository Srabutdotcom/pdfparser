function checkrowdif(row,rotate){
    //debugger;
    let row0 = deepClone(row[0]);//debugger;
    let row1
    let difY
    //let y0,y1,h1,h0,yt
    //let asc = (rotate===90||rotate===180)?true:false//in term of y
    const ascY = row['ascY']
    const dirY = ascY?1:-1;
    let row01
    const rowMerged = []
    for(let i=1;i<row.length;i+=1){
      //if(i===64)debugger;
      row1 = deepClone(row[i]);
      
      difY = (row0.y-row1.t)*dirY//if>0 then it should be merged
      if(difY>=0){
        //debugger;
        row01 = mergerow(row0,row1,rotate)
        //debugger;
        if(row01){
          row01['y'] = (row0.y+row1.y)/2
          rowMerged.push(row01)
          i+=1
          row0 = i<row.length?deepClone(row[i]):{};
        } else {
          rowMerged.push(row0)
          row0 = row1
        }
        //debugger;
      } else {
        rowMerged.push(row0)
        row0 = row1
      }
    }
    if(row0)rowMerged.push(row0)
    //debugger;
    return rowMerged
  }

  function mergerow(row0,row1,_rotate){
    let success = false;
    let str0
    let str1
    const newc = []
    let newi
    //let ascX = row0['ascX']//(rotate===0||rotate===90)?true:false//in term of x
    const dirY = row0['ascY']?1:-1;
    let difY = (row0.y-row1.t)*dirY
    
    const lgth = Math.max(row1.length,row0.length);
    for(let i=0;i<lgth;i+=1){
      str0 = row0[i]?.str
      str1 = row1[i]?.str
      difY = (row0[i]&&row1[i])?(row0[i].y-row1[i].t)*dirY:undefined
      //if(str0==="")debugger;
      //if(str1==="")debugger;
      //if(str0?.includes('Palestine')||str1?.includes('Palestine'))debugger;
      
      if(str0&&str1){success = false; break;} else {
        newi = str0?row0[i]:row1[i];
        if(newi&&newc[newc.length-1]&&newc[newc.length-1].r>newi.x){
          success = false
        } else if(difY<0){
          success = false
        } else {
          newc.push(newi)
          success = true
        }
      }
    }
    
    if(success){
      //debugger;
      return newc
    } else {
      //debugger;
      return false 
    }
   
  }

  function deepClone(o){
    const copied0 = JSON.parse(JSON.stringify({...o})) 
    const copied1 = []
    for(const i in copied0){
      copied1[i] = copied0[i]
    }
    return copied1
    //return JSON.parse(JSON.stringify(o))
  }

  export {checkrowdif}