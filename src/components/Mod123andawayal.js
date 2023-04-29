import React, {Component} from "react";
import { CardGroup } from "react-bootstrap";
import {
    Button,
    Modal as ModalY,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            claude: "CLAUDE",
        };
    };

    handleChange = (e) => {
        let {name, value} = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        };
        const activeItem = {...this.state.activeItem, [name]: value};
        this.setState({activeItem});
    };

    render() {
        const {toggle, toggle2, onSave} = this.props;

        if (toggle) {
            return (
                <ModalY isOpen={true}>
                    <ModalHeader toggle={toggle}>
                        Todo Item
                    </ModalHeader>
                    <ModalBody >
                        <Form>
                            <FormGroup>
                                <Label for="todo-title">Title</Label>
                                <Input 
                                    type="text" 
                                    id="todo-title" 
                                    name="title" 
                                    value={this.state.activeItem.title} 
                                    onChange={this.handleChange}
                                    placeholder="Enter Todo Titol" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="todo-description">Description</Label>
                                <Input 
                                    type="text" 
                                    id="todo-description" 
                                    name="description" 
                                    value={this.state.activeItem.description}
                                    onChange={this.handleChange}
                                    placeholder="Enter Todo Description"
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input 
                                        type="checkbox" 
                                        name="completed" 
                                        checked={this.state.activeItem.completed} 
                                        onChange={this.handleChange} 
                                    />
                                    Completed
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                        color="success" 
                        // onClick={() => onSave(this.state.activeItem)}
                        onClick={() => onSave(this.state.activeItem)}>
                            Save-o
                        </Button>
                        <Button
                        color="danger"
                        onClick={() => (toggle())}>
                            Nah
                        </Button>
                    </ModalFooter>
                </ModalY>
            );
        };
        if (toggle2) {
            return (
                <ModalY isOpen={true}>
                    <ModalHeader toggle={toggle2}>
                        Read Todo Item
                    </ModalHeader>
                    <ModalBody>
                        <div>{this.state.activeItem.title}</div>
                        <div>{this.state.activeItem.description}</div>
                        <div><b>
                            {this.state.activeItem.completed ? "Complete!" : "Incomplete!"}
                        </b></div>
                        <div><h2>{this.state.claude}</h2></div>
                    </ModalBody>
                </ModalY>
            );
        };
    };
};