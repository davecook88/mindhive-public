import React from 'react';

const formData = {
  initial: {
    url:'https://docs.google.com/forms/d/e/1FAIpQLSdCi045uQG2DkyJQHLe35aLPbakmnfpB_yg66r5Meu5gNNLoA/viewform',
    emailField: 'entry.1228230992',
  }
}

const createFormUrl = (url, details) => {
  const paramsObj = {
    embedded:true,
    usp:'pp_url',
    [details.emailField]: details.email,
  };

  const paramArray = [];
  for (let k in paramsObj) {
    paramArray.push(`${k}=${paramsObj[k]}`);
  }
  const paramStr = paramArray.length ? `?${paramArray.join('&')}` : '';
  return `${url}${paramStr}`;
}

const Form = props => {
  const iframe = props => {
    const { formName } = props;
    const data = formData[formName];
    const params = {
      emailField:data.emailField,
      email:props.email,
    };
    const url = createFormUrl(data.url, params);
    return (
      <iframe
        src={url}
        width="640"
        height="1055"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
    );
  };

  return (iframe(props));
};

export default Form;
