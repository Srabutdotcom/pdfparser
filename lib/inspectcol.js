function fillcol(row,xMax,xMin){
    const dcol = []
    dcol['xMax']=xMax;
    dcol['xMin']=xMin;
    for(let i=0;i<row.length;i+=1){
      //if(i===4)debugger;
      const str = row[i].str; 
      if(str===""||str===" "){
        continue; //empty string are not eligible for cells arrangment
        //console.log(`row[${i}] contains space white, excluded`)
      }
      //if(str.includes('Kepulauan Virgin Amerika'))debugger;
      const xF1 = parseFloat(row[i].x.toFixed(1));
      const rF1 = parseFloat(row[i].r.toFixed(1));
      dcol.push({
        left:[xF1],
        x:xF1,
        r:rF1,
        right:[rF1],
      })
      //debugger;
    }
    return dcol
    //debugger;
  }
  const updatecol=(l,s,dirX,left,right)=>{
    //validating s argument just in case we are miss 
    if(s===undefined||s.length===0){
      //console.log(`s is undefined or has no member to evaluate or merge, return to mergecol`)
      return 
    }
    
    for(let i=0;i<l.length;i+=1){
      if(i>=s.length)break;
      if(s[i]==='na'||s[i]===undefined){
        //console.log(`s[${i}] is undefined or has no member to evaluate or merge, continue to the next iteration`)
        continue;
      }
      
      //if(l[i].x===504.9||s[i].x===504.9)debugger;
      if(l[i].x!==s[i].x) {//both x must be reside in i
          const tmp = Math.min(l[i].x*dirX,s[i].x*dirX);
          if(!tmp){
            //console.log(`something wrong with ${l[i]} and ${s[i]} we need to bypass this`)
            continue;
          }
          l[i].x = tmp;
          const indexOfx = l[i]['left'].indexOf(tmp);
          if(indexOfx===-1){
            l[i]['left'].push(l[i].x)
          } else {
            if(!left.has(tmp)){
              //console.log(`save the new left alignment sign in ${i} with value of x: ${tmp} to the left Map`)
              left.set(tmp,i)
            }  
          }
          //debugger;
        } else {
          const x0 = l[i].x
          const _x1 = s[i].x
          //debugger;
          if(!left.has(x0)){
            //console.log(`save the new left alignment sign in ${i} with value of x: ${x0} to the left Map`)
            left.set(x0,i)
          }
        }
      if(l[i].r!==s[i].r&&s[i].r*dirX<(l?.[i+1]?.x??l['xMax'])*dirX){
        //r in s[i] might be outside i thus we must evaluate r within i
        const tmp = Math.max(l[i].r*dirX,s[i].r*dirX);
        if(!tmp){
            //console.log(`something wrong with ${l[i]} and ${s[i]} we need to bypass this`);
            continue;
          }
        l[i].r = tmp;
        const indexOfr = l[i]['right'].indexOf(tmp);
        if(indexOfr===-1){
          l[i]['right'].push(s[i].r)
        } else {
          if(!right.has(tmp)){
            //console.log(`save the new right alignment sign in ${i} with value of r: ${tmp} to the right Map`)
            right.set(tmp,i)
          }
        }
        //debugger;
      } else {
        const r0 = l[i].r
        const _r1 = s[i].r
        //debugger;
        if(!right.has(r0)){
          //console.log(`save the new right alignment sign in ${i} with value of r: ${r0} to the right Map`)
          right.set(r0,i)
        }
      }
      
    }
  }
  const copyArrayLike=(obj)=>{
    const copied=[]
    for(const [k,v] of Object.entries(obj)){
      copied[k] = v
    }
    //debugger;
    return copied
  }

  function mergecol(longcol,shortcol,dirX,left, right){
    //validating shortcol argument 
    if(shortcol===undefined||shortcol.length===0){
      //console.log(`shortcol is undefined or has no member to evaluate or merge, return to `)
      return longcol
    }
    let length = longcol.length;
    for(let i=0;i<length;i+=1){
      if(i>shortcol.length-1){
        //console.log(`index ${i} > shortcol[i].length-1 ${shortcol.length-1} need to break`)
        break;
      }
      if(shortcol[i]===undefined){
        //console.log(`shortcol member in ${i} is undefined then continue to the next iteration`)
        continue;
      }
      //if(longcol?.[i]?.x===504.9||shortcol?.[i]?.x===504.9)debugger;
      if(longcol[i]&&(shortcol[i].x*dirX>longcol[i].r*dirX)){
        shortcol.splice(i,0,"na")//
        //debugger;
        if(shortcol.length>length){
          length=shortcol.length;
          //console.log(`shortcol are getting longer after splice then add 1 iteration into length`)
          //debugger;
        }
        //debugger;
        continue;
      } else if(!longcol[i]){
        //debugger;
        longcol[i] = copyArrayLike(shortcol[i])
        //console.log(`copying shortcol in ${i} to longcol after adjusting length of shortcol`)
        //debugger;
        continue;
      } 
  
    }
    updatecol(longcol,shortcol,dirX, left, right)
    //debugger;
    return longcol
}

function inspectCol(rows){
    //this function is to determine the border of cells based on r and x property of cell
    //col will contain both l and r which are the border between 1st cell and the next cell
    const dirX = rows['ascX']?1:-1;
    let col0 = []
    let col1 = []
    const left = new Map()
    const right = new Map()
    
    //sort row based on the smaller length or array member
    rows.sort((a,b)=>b.length-a.length)
    //console.log(`rows sorted from the longest to shortest`)
    //debugger;
    let length0=0, length1=0
    for(let i=0;i<rows.length;i+=1){
      col0 = fillcol(rows[i],rows['xMax'],rows['xMin'])
      length0 = col0.length
      if(length0===0){
        continue;
        //console.log(`length 0 in ${rows[i]} is not eligible to evaluate`)
      }
      if(length1===0){
        col1 = copyArrayLike(col0);
        length1 = length0; //debugger;
        //console.log(`preparing for new pairs for col0 by copying col0 to col1 in iteration ${i}`)
        continue;
      } else if(length1>=length0) {
        //if(col0[col0.length-1].r>col1[col1.length-1].r)debugger;
        //console.log(`length col1 are ${length1} >= length of col0: ${length0} in index: ${i} before merge process`)
        col1 = mergecol(col1,col0,dirX,left,right)
        //console.log(`length col1 are ${col1.length} >= length of col0: ${col0.length} in index: ${i} after merge process`)
      } else if(length0>length1){
        //console.log(`length col1 are ${length1} < length of col0: ${length0} in index: ${i}before merge process`)
        col1 = mergecol(col0,col1,dirX,left,right)
        //console.log(`length col1 are ${col1.length} < length of col0: ${col0.length} in index: ${i}after merge process`)
      }
    }
    
    return {
      col:col1,
      left: left,
      right: right }
  }

  export {inspectCol}