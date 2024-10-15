import {
    sub_BasePage_dynamic,
    sub_BasePage_static,
    expect_error,
    expect_json,
    schema_validation, 
    expect_response_time,
    expect_header,
    common_methods, } from "./REST_JSON/files.js"
 

const BASEPAGE = {
    
    ...sub_BasePage_dynamic,
    ...sub_BasePage_static,
    ...expect_json,
    ...schema_validation,
    ...expect_response_time,
    ...expect_header,
    ...expect_error,
    ...common_methods,
        
}
const Base = BASEPAGE
export default Base

// Object.assign(BASEPAGE.prototype, sub_BasePage)

// const Base_json = new BASEPAGE()

// export default Base_json





