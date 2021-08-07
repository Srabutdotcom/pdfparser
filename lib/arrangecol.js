function getYinRow(row){
    return row['y'];
  }

  const ntoRight=(obj,clr,i,dirX,xMin,xMax)=>{
    let {x,r,_str}= obj
    const {col,left, right}= clr
    x = parseFloat(x.toFixed(1))
    r = parseFloat(r.toFixed(1))
    //if(str.includes('NOVEL'))debugger;
    //find x in the left
    //if the result is the same as i then return true
    //let iO = null
    if(left.has(x)){
      const getx = left.get(x) 
      //console.log(`${obj.str} is found in left: ${getx} shift ${getx-i} from current position`)
      //debugger;
      //if(getx-i<0)debugger;
      return getx-i;
    }
    if(right.has(r)){
      const getr = right.get(r)
      //console.log(`${obj.str} is found in right: ${getr} shift ${getr-i} from current position`)
      //debugger;
      //if(getr-i<0)debugger;
      return getr-i;
    }
    if(x*dirX>col[i].r*dirX){
      //console.log(`${obj.str} is might be on the right of cell ${i}`)
      //debugger;
      const tmp = findIn({col:col,i:i,x:x,r:r,dirX:dirX,xMin:xMin,xMax:xMax})-i
      //if(tmp<0)debugger;
      return tmp//findIn({col:col,i:i,x:x,r:r,dirX:dirX,xMin:xMin,xMax:xMax})
    }
    //debugger;
    return 0
  }

  const findIn = (par)=>{
    const {col,x,r,dirX,xMin,xMax} = par 
    let {i} = par
    let ix,ir
    /* let difx0=-1,difx1=-1
    let difr0=-1,difr1=-1 */
    let difxr,difxx
    let difrx,difrr
    let xdone = false
    let rdone = false
    let iscontinue = true
    let xSign0,rSign0
    let xSign1,rSign1
    
    //for(let j=i;j<col.length;j+=1){
    do {
      
      //find
      
      if(!xdone){
        difxr = (x-(col[i-1]?.r??xMin))*dirX; 
        xSign1 = Math.sign(difxr);
        if(xSign0&&xSign0*xSign1<0){
          ix = i-1;
          xdone = true;
          difxx = (x-col[ix].x)*dirX;//calculate the distance from x in col
          //console.log(`difxr: ${difxr} and difxx: ${difxx} found in ${ix}`)
          //debugger; 
        } else {xSign0 = xSign1}
      }
    
      if(xdone){
        difrx = ((col[i+1]?.x??xMax)-r)*dirX;
        rSign1=Math.sign(difrx);
        if(rSign0&&rSign0*rSign1<0){
          ir = i;
          rdone = true;
          difrr = (col[ir].r-r)*dirX;//calculate the distance from r in col
          //console.log(`difrx: ${difrx} and difrrr: ${difrr} found in ${ir}`)
          //debugger; 
        } else {rSign0 = rSign1}
      }
  
      else {/* TODO */}//debugger;}
      
     i+=1
      
      if(rdone)iscontinue=false
      if(i===col.length&&!ir){ir=i-1;iscontinue=false}
    } while(iscontinue)
    
    difrr = (col[ir].r-r)*dirX;
    if(difxx<difrr){
      //console.log(`the result are in left difxx: ${difxx} < difrr: ${difrr}`)
      //debugger;
      return ix
    } else {
      return ir
    }
    
    //return ir
    
  }

function arrangeCol(rows,clr){
    //validating clr parameter
    if(clr===undefined||clr===null){
      //console.log(`clr is undefined, end`);
      return
    }
    const {col,_left,_right} = clr
    
    //let [xMin, yMin, xMax, yMax] = view;
    //let child = []
   
    //determine if x is ascending or descending 
    //let asc = (row[0][1]&&row[0][1].x>row[0][0].x)?true:false;     
    const ascX = rows['ascX']
    const ascY = rows['ascY']
    const dirX = ascX?1:-1;
    const dirY = ascY?1:-1;
    
    //sort row based on the smaller length or array member
    rows.sort((a,b)=>a.length-b.length)
    //console.log(`rows are sorted from smaller to larget, re-arrangment are from small to large`)
    //debugger;
    //loop over all row 
    //at least 2 cells to arrange col
    for(let i=0;i<rows.length;i+=1){
      if(rows[i].length===col.length){
        //console.log(`length are the same no need to re-arrange then continue to the next iteration`)  
        continue;
      }
      for(let j=0;j<col.length;j+=1){
        if(j>rows[i].length-1){
          //console.log(`${j} are beyond rows[${i}].length-1: ${rows[i].length-1}, break the loop`);
          break;
        }
        if(rows[i][j]===undefined||rows[i][j]==="na"){
          //console.log(`rows[${i}][${j}] is undefined or na, continue to next`);
          continue;
        }
        if(rows[i][j].str===""||rows[i][j].str===" "){
          //console.log(`rows[${i}][${j}] is empty string or white space, continue to next`);
          //TO DO clean up empty or white space
          rows[i].splice(j,1);//debugger;
          j-=1;
          continue;
        }
        //if(rows[i][j].str.includes('Palestina')){debugger}
        //debugger;
        const nShift = ntoRight(rows[i][j],clr,j,dirX,rows['xMin'],rows['xMax'])
        if(nShift===0){
          continue;
        } else {
          rows[i].splice(j,0,...Array(nShift));
          //console.log(`rows[${i}] is shifted ${nShift} to the right, re-arranged done `);
          j+=nShift-1;
        }
        
      }
    }
  
    //cleaning up empty or white space
    //rows = rows.filter(e=>e.length>0);
    //debugger;
    //sort back row based on y position
      rows.sort((a,b)=>{
        const yb = getYinRow(b);
        const ya = getYinRow(a)
        return (ya-yb)*dirY;
      })
      
   //debugger;
  }

  export {arrangeCol}