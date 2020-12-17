import {
  pathHome,
  pathProjects,
  pathProject,
  pathToolbox,
  pathOpenSource,
  pathAbout
} from "@/config/paths";

describe("test paths", () => {
  it("Path home", () => {
    expect(pathHome()).toBe("/")
  })
  it("Path projects", () => {
    expect(pathProjects()).toBe("/projects")
  })
  it("Path project", () => {
    expect(pathProject("1234")).toBe("/projects/1234")
  })
  it("Path toolbox", () => {
    expect(pathToolbox()).toBe("/toolbox")
  })
  it("Path open source", () => {
    expect(pathOpenSource()).toBe("/opensource")
  })
  it("Path about", () => {
    expect(pathAbout()).toBe("/about")
  })
})