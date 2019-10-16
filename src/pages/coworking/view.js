import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCoworking } from './redux/actions'
import Spinner from '../../components/common/spinner'

class View extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getCoworking(id)
    }

    render() {
        const { coworking, isFetching } = this.props

        if (isFetching) {
            return <Spinner />
        }

        return (
            <div>
                <img src={coworking.images && coworking.images[0].full_path} alt="img" height="300" />
                <img src={coworking.images && coworking.images[0].full_path} alt="img" width="800" />
                <img src={coworking.images && coworking.images[0].full_path} alt="img" height="300" />

                <div>
                    {

                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    coworking: state.coworking.item,
    isFetching: state.coworking.isFetching
})



export default connect(mapStateToProps, { getCoworking })(View)
