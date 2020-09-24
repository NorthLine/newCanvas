
//2
const timeTool={
    dataIsInThisWeek(dateNumber){
        let getNow=new Date()
        //获取当前周几
        let getDayNumber=getNow.getUTCDay();
        //获取年月日数字
        let thisDate=this.getYMDStr(getNow);
        let lowNumber=Date.parse(thisDate)-(getDayNumber-1)*24*60*60*1000
        let maxNumber=Date.parse(thisDate)+(7-getDayNumber+1)*24*60*60*1000
        if(dateNumber>=lowNumber&&dateNumber<=maxNumber){
            return true
        }else{
            return false
        }
    },
    getYMDStr(date){
        let getYear=date.getUTCFullYear()
        let getMonth=date.getUTCMonth()+1
        let getDay=date.getUTCDate()
        return getYear+'-'+getMonth+'-'+getDay
    }
}

console.log(timeTool.dataIsInThisWeek(Date.parse(new Date('2020-08-24 01:01:01'))))
console.log(timeTool.dataIsInThisWeek(Date.parse(new Date('2020-08-30 23:23:01'))))
console.log(timeTool.dataIsInThisWeek(Date.parse(new Date('2020-08-31 01:01:01'))))
console.log(timeTool.dataIsInThisWeek(Date.parse(new Date('2020-09-24 01:01:01'))))
console.log(timeTool.dataIsInThisWeek(Date.parse(new Date('2020-08-23 01:01:01'))))


//3
function arrayToproduct(array){
    let newArray=[]
    let getAll=eval(array.join('*'))
    array.forEach((a)=>{
        newArray.push(getAll/a)
    })
    console.log(newArray)
    return newArray
}

arrayToproduct([1,2,3,4])
