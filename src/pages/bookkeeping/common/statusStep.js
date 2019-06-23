//src/pages/bookkeeping/common/statusStep.js
import React from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


function getSteps(reducer) {
    var res = []
    switch(reducer){
      case "invoice": 
        res = ['draft', 'sent', 'paid']
      break
      case "refund": 
        res = ['draft', 'sent', 'refunded']
      break
      default: 
        res = ['draft', 'sent', 'approved']
    }

    return res
}
  
  function getActiveStep(status){
    if(status){
        if(status.code === "1"){
            return 0
        }else if(status.code === "2"){
            return 1
        }else if(status.code === "6"){
            return 3
        }else if(status.code === "7"){
            return 3
        }else if(status.code === "8"){
            return 3
        }
    }
  }

const StatusStep = (props) => {

    const { item, locale, reducer } = props
    const steps = getSteps(reducer);
    const activeStep = getActiveStep(item.status)

    return (
        <Stepper activeStep={ activeStep } alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{locale.wording[label]}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )
}


export default StatusStep
