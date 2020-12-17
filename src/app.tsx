import React from 'react';
import { Route, Switch} from "react-router";
import * as path from "@/config/paths";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects"
import ToolBox from "@/pages/ToolBox"

const App = () => {
  return (
    <Switch>
      <Route exact path={path.pathHome()} component={Home} />
      <Route exact path={path.pathProjects()} component={Projects} />
      {/* <Route exact path={path.pathProject(":id")} component={Home} /> */}
      <Route exact path={path.pathToolbox()} component={ToolBox} />
      {/* <Route exact path={path.pathOpenSource()} component={Home} />
      <Route exact path={path.pathAbout()} component={Home} /> */}
    </Switch>
  )
};

export default App;