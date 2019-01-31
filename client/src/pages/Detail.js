import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { TextArea, FormBtn, } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem, } from "../components/List";




class Detail extends Component {
  state = {
    blog: {},
    response:""
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    this.loadBlog();
  };
  
  loadBlogs = () => {
    API.getBlog()
      .then(res =>
        this.setState({ blog: res.data, topic: "", author: "", synopsis: "" })
      )

      .catch(err => console.log(err));
  };
  
  // updateBlogs = () => {
  //   API.updateBlog()
  //     .then(res =>
  //       this.setState({ blogs: res.data, topic: "", author: "", synopsis: "", response: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  handleResponseChange = event => {
    const { value } = event.target;
    this.setState({
      blog: { ...this.state.blog, response: value }
    });
  };
  
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.blog.response) {
      API.saveBlog(this.state.blog._id, this.state.blog)
        .then(res => this.loadBlog())
        .catch(err => console.log(err));
    }
  };

  deleteBlog = id => {
    API.deleteBlog(id)
      .then(res => this.loadBlog())
      .catch(err => console.log(err));
  };

  render() {
    const blog = this.state.blog;
    const { topic, author, synopsis, response, _id} = blog;
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {topic} by {author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {synopsis}
              </p>
            <form>
            {this.state.blog.response}
            </form>             
              
              <p>
                <List>
                  <ListItem key={_id}>
                    <Link to={"/blogs/" + _id}>
                      <strong>
                        {response}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBlog(_id)} />
                  </ListItem>
                </List>
                </p>
              <form>
              <TextArea
                value={response}
                onChange={this.handleResponseChange}
                name="response"
                placeholder="Provide Response"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Submit Response
              </FormBtn>
            </form>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Bloggers</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
