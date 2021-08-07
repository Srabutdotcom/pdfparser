import {checkrowdif} from './checkrowdif.js';
import {arrangeCol} from './arrangecol.js';
import {pushitemtorow} from './pushitemtorow.js';
import {inspectCol} from './inspectcol.js';

function _getX(item) {
    // scaleX, scale01, scale10, scaleY, x, y
    if (item && Array.isArray(item.transform)) {
      return item.transform[4] || -1;
    }
    return -1;
  }
  function _getY(item) {
    // scaleX, scale01, scale10, scaleY, x, y
    if (item && Array.isArray(item.transform)) {
      return item.transform[5] || -1;
    }
    return -1;
  }

function parsepdf(items,rotate,view){
    //debugger;
    let getX = _getX;//ascending for rotate 0, the opposite for rotate 180 
    let getY = _getY;//descending for rotate 0, , the opposite for rotate 180
    if(rotate===90||rotate===270){
      getX = _getY;//ascending for rotate 90, the opposite for rotate -90
      getY = _getX;//ascending for rotate 90, the opposite for rotate -90 
    }
    const ascX = (rotate===0||rotate===90)?true:false//in term of x
    const ascY = (rotate===90||rotate===180)?true:false//in term of y
    //row collection
    const row = []
    const col = []
    /* let _left = []
    let _right = [] */
    row['ascX']=ascX
    row['ascY']=ascY
    row['xMax'] = col['xMax'] = ascX?view?.[2]:0;
    row['yMax'] = col['yMax'] = ascY?0:view?.[3];
    row['xMin'] = col['xMin'] = ascX?0:view?.[2];
    row['yMin'] = col['yMin'] = ascY?view?.[3]:0;
    //debugger;
    
    for(const item of items){
      //debugger;
      if(item.str===""||item.str===" ")continue;//{spacewidth.push(item);continue}
      item.x = getX(item)
      item.y = Math.round(getY(item))
      item.t = item.y + item.height*(ascY?-1:1);
      item.r = item.x + item.width*(ascX?1:-1);
      item.ascX = ascX
      item.ascY = ascY
      pushitemtorow(item, row)
      //debugger
    }
    const clr = inspectCol(row)
    
    //debugger;
    arrangeCol(row,clr)
    //debugger;
    return checkrowdif(row,rotate).filter(e=>e.length>0)
    //debugger;
    //return row;
  }

  export {parsepdf}