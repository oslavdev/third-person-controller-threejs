import { render } from "@testing-library/react";
import Lights from "@/components/Three/Light";

describe('Light', () => {

  const LightComponent = render(<Lights/>);

  it('Snapshot', () => {
   
    expect(
      LightComponent
    ).toMatchSnapshot()
  });

})  
