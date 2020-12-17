import { render } from "@testing-library/react";
import App from "@/app";

describe('App', () => {

  const AppComponent = render(<App/>);


  it('Snapshot', () => {
   
    expect(
      AppComponent
    ).toMatchSnapshot()
  });

})  
