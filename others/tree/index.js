$(function() {
    let data = [{
            id: 1,
            name: '1',
        }, {
            id: 2,
            name: '1-1',
            parentId: 1
        }, {
            id: 3,
            name: '1-1-1',
            parentId: 2
        }, {
            id: 4,
            name: '1-2',
            parentId: 1
        }, {
            id: 5,
            name: '1-2-2',
            parentId: 4
        }, {
            id: 6,
            name: '1-1-1-1',
            parentId: 3
        }, {
            id: 7,
            name: '2',
        }]
        // 先找出所有的顶级元素，每个顶级元素和其子元素作为参数进入函数
    var parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null);
    // 找到顶级元素，dom树将在此元素下创建
    let TreeWrapper = $("#tree-wrapper")
    for (let i = 0; i < parents.length; i++) {
        let parent = parents[i];
        buildTree(TreeWrapper, parent);
    }

    console.log(parents);

    function buildTree(TreeContent, parent) {
        let children = data.filter((value) => {
            return value.parentId == parent.id;
        })
        let tempDom = null;
        if (children.length == 0) {
            tempDom = $(`<div class="tree-item-wrapper">
                            <div class="tree-title" data-id="${parent.id}">
                                ${parent.name}
                            </div>
                        </div>`)
        } else {
            tempDom = $(`<div class="tree-item-wrapper">
                            <div class="tree-title" data-id="${parent.id}">
                                <i class="expand-icon down-icon" data-expand="1"></i>${parent.name}
                            </div>
                        </div>`)
        }
        TreeContent.append(tempDom);
        if (children.length != 0) {
            for (let i = 0; i < children.length; i++) {
                let pdata = children[i];
                let cdata = children.filter((item) => {
                    return item.parentId == pdata.id;
                })
                buildTree(tempDom, pdata, cdata);
            }
        }
    }
    // 标题点击事件，这里只传参数到函数就可以了
    for (let i = 0; i < $(".tree-title").length; i++) {
        $($(".tree-title")[i]).click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log($(this).data('id'));
        });
    }
    // 三角形点击折叠事件
    //  联动事件写在组件里面，不在这个地方写
    for (let i = 0; i < $(".expand-icon").length; i++) {
        // console.log($(".tree-title")[i])
        $($(".expand-icon")[i]).click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            // 检测到有子元素的话将其覆盖
            if ($(this).parent().next().attr("class") == 'tree-item-wrapper') {
                // 用i的data-expand判断展开状态，1是0否 
                // 如果是展开状态，则隐藏下面的title并更改i的class
                if ($(this).data('expand') == 1) {
                    $(this).parent().next().css({
                        display: "none"
                    })
                    $(this).removeClass("down-icon").addClass("right-icon");
                    $(this).data("expand", 0);
                    return;
                }
                if ($(this).data('expand') == 0) {
                    $(this).parent().next().css({
                        display: "block"
                    })
                    $(this).removeClass("right-icon").addClass("down-icon");
                    $(this).data("expand", 1);
                    return;
                }
            }
        })
    }
})