import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorItself: "",
            errorInfo: []
        };
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorItself: error,
            errorInfo: info
        });
        console.log("ERROR!", this.state.errorInfo);
    };

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>An Error Has Happened!</h1>
                    <p>{this.state.errorItself.toString()}</p>
                </>
            );
        };

        return this.props.children;
    };
};
