import { render } from "@testing-library/react";
import Nav from "@/components/Navigation/Nav";

describe('Nav', () => {

  const NavComponent = render(<Nav/>);

  it('Snapshot', () => {
   
    expect(
      NavComponent
    ).toMatchSnapshot()
  });

})  
