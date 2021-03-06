var TableRegex = function () {
    var oTableRegex = new Object();
    //初始化Table
    oTableRegex.Init = function () {
        $('#tb_regex').bootstrapTable({
            url: '/crawl/regex/getRegexPage',         //请求后台的URL（*）
            queryParams:oTableRegex.queryParams,
            method: 'get',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 5,                       //每页的记录行数（*）
            pageList: [5, 10, 25, 50, 100],        //可供选择的每页的行数（*）
            contentType: "application/x-www-form-urlencoded",
            height:275,
            singleSelect:true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            clickToSelect: true,                //是否启用点击选中行
            uniqueId: "regexid",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            idField:'regexid',
            columns: [
                { field: 'regexid',  title: 'ID', visible: false , halign:'center'  },
                { field: 'planid',  title: 'planid',  visible: false ,halign:'center' },
                { field: 'regexpath', title: '爬取地址过滤规则' ,halign:'center', width:'35%' },
                { field: 'regexpathdesc', title: '爬取地址过滤规则描述' ,halign:'center', width:'40%' },
                { field: 'createtime', title: '创建时间',halign:'center', align:'center', width:'10%' },
                { field: 'operate', title: '操作', formatter: operateFormatter4regex , halign:'center',align:'center' , width:'15%'}
            ]
        });

    };
    oTableRegex.queryParams = function(params) {
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit : params.limit
            ,offset : params.offset
            ,planid:  $("#planid").val()
        };
        return temp;
    };
    return oTableRegex;
};


function operateFormatter4regex(value, row, index) {//赋予的参数
    return [
        '<a class="operatebtn" href="javascript:void(0);" title="修改" regexid="'+ row.regexid +'"  onclick="updateRegex(this)" ><i class="fa fa-pencil-square" aria-hidden="true"></i></a>',
        '<a class="operatebtn" href="javascript:void(0);" title="删除" regexid="'+ row.regexid +'"  onclick="deleteRegex(this)" ><i class="fa fa-trash-o" aria-hidden="true"></i></a>'
    ].join('');
}

function updateRegex(obj) {
    regexid = $(obj).attr("regexid") ;
    $("a[role='addregex']").click();
}

function deleteRegex(obj){
    var id = $(obj).attr("regexid") ;
    $.ajax({
        url:'/crawl/regex/deleteRegex?regexid='+id,
        async:false,
        success:function(data){
            if(data.isDelete = 'ok'){
                $.scojs_message('删除爬取起始地址成功!', $.scojs_message.TYPE_OK);
            }else{
                $.scojs_message('删除爬取起始地址失败!', $.scojs_message.TYPE_ERROR);
            }
        }
    });
    $("#tb_regex").bootstrapTable('refresh');
    regexid = "";
}