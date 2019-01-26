import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Blogs extends Component {
  state = {
    blogs: [],
    topic: "",
    author: "",
    synopsis: "",
    response: ""
  };

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs = () => {
    API.getBlogs()
      .then(res =>
        this.setState({ blogs: res.data, topic: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBlog = id => {
    API.deleteBlog(id)
      .then(res => this.loadBlogs())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.author) {
      API.saveBlog({
        topic: this.state.topic,
        author: this.state.author,
        synopsis: this.state.synopsis,
        response: this.state.response
      })
        .then(res => this.loadBlogs())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Post Your Question Here</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Submit Question
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Lastest Blogs</h1>
            </Jumbotron>
            {this.state.blogs.length ? (
              <List>
                {this.state.blogs.map(blog => (
                  <ListItem key={blog._id}>
                    <Link to={"/blogs/" + blog._id}>
                      <strong>
                        {blog.topic} by {blog.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBlog(blog._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Blogs;
