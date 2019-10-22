<template>
    <div class="tree-wrapper">
        <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <!-- <span>{{ node.label }}</span>
                <span>
                    <el-button type="text" size="mini" @click="() => append(data)">
                        Append
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">
                        Delete
                    </el-button>
                </span> -->
                <el-collapse>
                    <el-collapse-item>
                        <template slot="title">
                            <span>{{ node.label }}</span>
                            <span>
                                <el-button type="text" size="mini" @click="() => append(data)">
                                    Append
                                </el-button>
                                <el-button type="text" size="mini" @click="() => remove(node, data)">
                                    Delete
                                </el-button>
                            </span>
                        </template>
                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    </el-collapse-item>
                </el-collapse>
            </span>
        </el-tree>
    </div>
</template>

<script>
let id = 1000;
export default {
    name: 'detail',
    data() {
        return {
            data: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        },
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1'
                        },
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        renderContent(h, { node, data }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-button size="mini" type="text" on-click={() => this.append(data)}>
                            Append
                        </el-button>
                        <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
                            Delete
                        </el-button>
                    </span>
                </span>
            );
        }
    }
};
</script>

<style scoped lang="scss">
.tree-wrapper {
    padding: 20px;
    /deep/ .el-tree-node__content {
        height: auto;
    }
    .custom-tree-node {
        background-color: transparent;
        /deep/ .el-collapse-item__header,
        /deep/ .el-collapse-item__wrap {
            background-color: transparent;
        }
    }
}
</style>
