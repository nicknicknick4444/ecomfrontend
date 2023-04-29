import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorItself: "",
            errorInfo: []
        };
    }

    // static getDerivedStateFromError(error) {
    //     return {hasError: true};
    // }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorItself: error,
            errorInfo: info
        });
        console.log("GRAH!!!!", this.state.errorInfo);
        // this.logErrorToMyService(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>An Error Has Happened!</h1>
                    <p>{this.state.errorItself.toString()}</p>
                </>
            );
        }

        return this.props.children;
    }
}
