import React, {Component} from 'react';
import {Card,Table,Button,Icon} from "antd";
import {connect} from 'react-redux';
import {getCategoriesAsync} from '../../redux/action-creators/category';


@connect(state =>({categories: state.categories}),{getCategoriesAsync})
class Category extends Component {
  componentDidMount() {
    this.props.getCategoriesAsync();
  }

  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      // className: 'column-money',
      // dataIndex: 'money',
      render: () =>{
        return (
          <div>
            <Button type={"link"}>修改分类</Button>
            <Button type={"link"}>删除分类</Button>
          </div>
        )
      }
    },
  ];
  render() {
    const {categories} = this.props;
    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type={"primary"}>
              <Icon type={"plus"}/>
              分类列表
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            rowKey={"_id"}
            pagination={{
              showQuickJumper:true,
              showSizeChanger: true,
              pageSizeOptions:[
                '3','6','9','12'
              ],
              defaultPageSize:"3"
            }}
          />,
        </Card>
      </div>
    );
  }
}

export default Category;