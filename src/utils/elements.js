/**
 * @author hem <hem@isyscore.com>
 * @description 全局elements插件.
 * */

import {
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
    Pagination
} from 'element-ui';

const elementList = [
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
    Pagination
];
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
