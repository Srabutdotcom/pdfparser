const diffXTol = -2.5
const diffYTol = 1

function findYinRow(item, row){
    //let [xMin, yMin, xMax, yMax] = view;
    //let found = false;
    for(let r=0;r<row.length;r+=1){
      const diffY = Math.abs(row[r]['y']-item.y);
      if(diffY<=diffYTol){
        return r
        //break;
      }
    }
    return 'NotFound'
  }

  function joinItem(rowr,item){
  
    const dirX = item.ascX?1:-1;//the direction of X
    let prevItem = rowr[0];
    let currItem 
    //let joinItem
    let difX
    const joinRow = []
    joinRow['y'] = rowr['y']
    joinRow['t'] = rowr['t']
    
    for(let i = 1;i<rowr.length;i+=1){
      currItem = rowr[i]
      difX = (prevItem.r-currItem.x)*dirX;
      //if difX + it must be joined
      //if difX - and still within tolerance, then it musb be joined too
      if(difX>0){// here we take r from last item plus width from new item as this will get the fartest of r
        prevItem.str = prevItem.str + currItem.str;
        prevItem.r = prevItem.r + currItem.width*dirX;
        prevItem.width = (prevItem.r - prevItem.x)*dirX;
      } else if(difX>diffXTol){ //this formula are different with above formula as 
      //we take the fartest position for the most right r from new item
        prevItem.str = prevItem.str + currItem.str;
        prevItem.r = currItem.r;
        prevItem.width = (currItem.r - prevItem.x)*dirX;
      } else {
        joinRow.push(prevItem);
        prevItem = currItem;
      }
    }
    //debugger;
    joinRow.push(prevItem)
    
    return joinRow
   
  }

function pushitemtorow(item, row){
    //const r
    let ascX
    let dirX
    if(row.length===0){
      row[0] = []
      row[0].push(item)
      row[0]['y']=item.y;
      row[0]['t']=item.t;//debugger;
      //col = inspectCol(row,0,col)
      return;
    } //debugger;  
    
    const r = findYinRow(item,row)   
    
    if(r==='NotFound'){
      //debugger;
      //if(col?.inspect)col = inspectCol(row,col['inspect'],col);
      row.push([item]);
      row[row.length-1]['y']=item.y 
      row[row.length-1]['t']=item.t;//debugger;
    } else{
      ascX = row[r]['ascX']
      dirX = ascX?1:-1;
      row[r].push(item);
      row[r].sort((a,b)=>(b.x-a.x)*dirX)
      row[r] = joinItem(row[r],item)
      //if(row[r].length>1)col = inspectCol(row,r,col);
    }
  }

  export {pushitemtorow}