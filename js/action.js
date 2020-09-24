$('#12').click(function (){
    alert(123123)
})
var $centerPanZoom=$('.frameBox').centerPanZoom({
    onStart: function (a, b, c) {

    },
    onChange: function (a, b, c) {

    },
    onPan:function(a,b,c,d,e){
        // console.log(a, b, c,d,e)

    }
});


/**
 * @name fixedOneLVInOneLines
 * @description 平衡根节点及其配偶
 * */
function fixedOneLVInOneLines(){
    var getToTop=baseObj.offset().top
    $.each($('.lv100'),function (index,element){
        var $lv100=$(element);
        if($lv100.offset().top!=getToTop){
            var fixedNums=getToTop-$lv100.offset().top
            var getParentObj=$lv100.parents('.personInners');
            getParentObj.css({
                'position':'relative',
                'top':fixedNums
            })
        }
    })
}



/**
 * @name insertTemplate
 * @description 返回节点的模板
 * */
var insertTemplate=function (){
    return `<div class="personInners">
                        <div class="fatherBox">

                        </div>
                        <div class="personInnerCont {{lv}}" tid="{{id}}">
                            <div class="lineConnectBox"></div>
                            <div class="viewOtherBtns"></div>
                            <div class="personImgs"><img src="{{imgUrl}}" alt=""></div>
                            <div class="personNames">{{name}}</div>
                        </div>
                        <div class="childrenBox">
                        </div>
                    </div>`;
}
/**
 * @name insertPerson
 * @description 构建人物布局
 * @param data 根节点人物数据
 * @param parent 父级容器
 * */
function insertPerson(data,parentBox){

    var getTemp=insertTemplate().replace('{{name}}',data.name)
        .replace('{{id}}',data.id)
        .replace('{{lv}}','lv'+data.lv)
        .replace('{{imgUrl}}','image/'+(data.sex == 1?'female':'male')+'.png');
    var $obj=$(getTemp)
    $obj.data('node',data)
    $obj.find('.personInnerCont').data('node',data)
    $obj.find('.personInnerCont').data('lineObj', $obj.find('.lineConnectBox'))
    $obj.find('.personInnerCont').data('bannerObj', $obj.find('.viewOtherBtns'))
    if(data.root){
        $obj.find('.personInnerCont').attr('id','rootNode')
    }
    var $fatherBox=$obj.find('.fatherBox')
    var $childrenBox=$obj.find('.childrenBox')
    $obj.appendTo(parentBox)


    console.log($obj.parents('.fatherBox').length)
    console.log($obj.parents('.childrenBox').length)
    console.log(data)
    if(data.spouseArry){
        if(data.spouseArry.length>0){
            data.spouseArry.forEach(function (a,b){
                insertPerson(a,parentBox)
            })
        }
    }

    if(data.parentsArry){
        if(data.parentsArry.length>0){
            data.parentsArry.forEach(function (a,b){
                insertPerson(a,$fatherBox)
            })
        }
    }

    if(data.childrenArry){
        if(data.childrenArry.length>0){
            if($obj.parents('.fatherBox').length.length>0){

            }else{
                data.childrenArry.forEach(function (a,b){
                    insertPerson(a,$childrenBox)
                })
            }
        }
    }
}

var colorArry=['#ff6200','#84ad04','#cb0e28','#05bbc2']

/**
 * @name lineConnectAction
 * @description 基于已生成的人物布局，用画线的方式链接上 基于 `.personInnerCont` 的位置来连接
 * */
function lineConnectAction(){
    $.each($('.personInnerCont'),function ($index,thisNode) {
        var $thisNode=$(thisNode)
        var data=$thisNode.data('node')
        var $lineObj=$thisNode.data('lineObj')
        if(data.spouseArry){
            if(data.spouseArry.length>0){
                data.spouseArry.forEach(function (a,b){
                    LineToSppouse($lineObj,$thisNode,$('.personInnerCont[tid="'+a.id+'"]'),b)
                })
            }
        }

        if(data.parentsArry){
            if(data.parentsArry.length>0){
                data.parentsArry.forEach(function (a,b){
                    LineToparent($lineObj,$thisNode,$('.personInnerCont[tid="'+a.id+'"]'))
                })
            }
        }

        if(data.childrenArry){
            if(data.childrenArry.length>0){
                data.childrenArry.forEach(function (a,b){
                    LineToChild($lineObj,$thisNode,$('.personInnerCont[tid="'+a.id+'"]'))
                })
            }
        }
    })

}

/**
 * @name LineToSppouse
 * @description 连接配偶 一对一连接
 * @param {$.fn_保存线的容器} $lineObj
 * @param {$.fn_原始节点} $node
 * @param {$.fn_配偶节点} $spouse
 * @param {number_第几个配偶} $number
 * */
function LineToSppouse($lineObj,$node,$spouse,$number){
    var color=colorArry[$number]
    var getWidth=$spouse.offset().left-$node.offset().left-20
    $lineObj.append('<div style="position: absolute;height: 2px;z-index:5;left:93px;top: ' +(50+6*$number)+
        'px; background: ' +color+
        ';width: ' +getWidth+
        'px;"></div>')
}
/**
 * @name LineToparent
 * @description 连接父级 一对一连接
 * @param {$.fn_保存线的容器} $lineObj
 * @param {$.fn_原始节点} $node
 * @param {$.fn_父节点} $parent
 * */
function LineToparent($lineObj,$node,$parent){
    var color=colorArry[0]
    var getWidth=$parent.offset().left-$node.offset().left
    var getLeft=getWidth+45
    var cutHeight=$node.offset().top-$parent.offset().top-125
    $lineObj.append('<div style="position: absolute;width: 2px;z-index:5;left:45px;height:7px;top: -10px; background: ' +color+
        '"></div>')
    $lineObj.append('<div style="position: absolute;width: 2px;z-index:5;left:' +getLeft+
        'px;height:' +(cutHeight-10)+
        'px;top: -' +cutHeight+
        'px; background: ' +color+
        '"></div>')
    $lineObj.append('<div style="position: absolute;top: -10px;height: 2px;z-index:5;width: ' +(getWidth>0?getWidth:(-getWidth))+
        'px;left:' +getLeft+
        'px;background: ' +color+
        '"></div>')
}
/**
 * @name LineToChild
 * @description 连接子级 一对一连接
 * @param {$.fn_保存线的容器} $lineObj
 * @param {$.fn_原始节点} $node
 * @param {$.fn_子女节点} $child
 * */
function LineToChild($lineObj,$node,$child){
    var color=colorArry[0]
    var getWidth=$child.offset().left-$node.offset().left
    var trueWidth=getWidth>=0?getWidth:(-getWidth)
    var getLeft=getWidth+45
    var cutHeight=$child.offset().top-$node.offset().top-125
    $lineObj.append('<div style="position: absolute;width: 2px;z-index:5;left:45px;height:7px;bottom: -10px; background: ' +color+
        '"></div>')
    $lineObj.append('<div style="position: absolute;width: 2px;z-index:5;left:' +getLeft+
        'px;height:' +(cutHeight-10)+
        'px;bottom: -' +cutHeight+
        'px; background: ' +color+
        '"></div>')
    $lineObj.append('<div style="position: absolute;bottom: -10px;height: 2px;z-index:5;width: ' +trueWidth+
        'px;left:' +(getLeft<=0?getLeft:47)+
        'px;background: ' +color+
        '"></div>')
}



insertPerson(nodeList,$('.personLineCont'))

var baseObj=$('#rootNode')
fixedOneLVInOneLines()
$centerPanZoom.panToObj(baseObj);
lineConnectAction()

