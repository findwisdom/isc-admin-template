/**
 * @author hem <hem@isyscore.com>
 * @description 全局elements插件.
 * */

import Vue from 'vue';

import {
    Switch,
    InputNumber,
    Scrollbar,
    DatePicker,
    Tooltip,
    Tag,
    Steps,
    Step,
    Row,
    Col,
    Button,
    Select,
    OptionGroup,
    Option,
    Input,
    Table,
    TableColumn,
    Form,
    FormItem,
    Dialog,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Loading,
    Breadcrumb,
    BreadcrumbItem,
    Pagination,
    Upload,
    Message,
    Tree,
    Collapse,
    CollapseItem
} from 'element-ui';

const elementList = [
    Switch,
    InputNumber,
    Scrollbar,
    DatePicker,
    Tooltip,
    Tag,
    Steps,
    Step,
    Row,
    Col,
    Button,
    Select,
    OptionGroup,
    Option,
    Input,
    Table,
    TableColumn,
    Form,
    FormItem,
    Dialog,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Loading,
    Breadcrumb,
    BreadcrumbItem,
    Pagination,
    Upload,
    Message,
    Tree,
    Collapse,
    CollapseItem
];
Vue.prototype.$message = Message;

const elements = {
    install: function(Vue) {
        elementList.forEach(comp => {
            if (comp === Loading) {
                Vue.use(Loading.directive);
            } else {
                Vue.component(comp.name, comp);
            }
        });
    }
};

export default elements;
