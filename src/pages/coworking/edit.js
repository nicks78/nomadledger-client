import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Edit extends Component {
    render() {
        return (
            <div>
                edit
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
