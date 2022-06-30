import React, { Component } from 'react'

const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends Component<any, any> {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }

    componentDidCatch(error) {
      // Display fallback UI
      this.setState({ hasError: true })
      errorCallback(error)
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return null
      }
      return React.isValidElement(Element)
        ? Element
        : null
    }
  }
}

export default errorBoundary
