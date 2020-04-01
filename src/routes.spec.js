/* eslint-env jest */
import routes from "./routes";
import ImagePage from "./components/imagepage/ImagePage";
import HomePage from "./components/homepage/HomePage";

describe("routes", () => {
    
    /*
    * Personally, I'm not sure the worth of these tests. But heres to show it can be done quite easily.
    */
    
    it("should have homepage mapped to '/'", () => {
        const home = routes.find(route => route.path === "/");
        expect(home.component).toBe(HomePage);
    });

    it("should have imagepage mapped to '/rovers/curiosity/images'", () => {
        const curiosity = routes.find(route => route.path === "/rovers/curiosity/images");
        expect(curiosity.component).toBe(ImagePage);
    });

    it("should pass in correct props to curiosity page", () => {
        const curiosity = routes.find(route => route.path === "/rovers/curiosity/images");
        expect(curiosity.props).toEqual({
          rover: "curiosity",
          token: "v3AqJhzni7HLy5MJ8rUQGAx61xCyxbCySRcIzgsC",
          start: new Date(2012, 7, 6),
          end: new Date(2019, 8, 28)
        });
    });

    it("should have imagepage mapped to '/rovers/spirit/images'", () => {
        const spirit = routes.find(route => route.path === "/rovers/spirit/images");
        expect(spirit.component).toBe(ImagePage);
    });

    it("should pass in correct props to spirit page", () => {
        const spirit = routes.find(route => route.path === "/rovers/spirit/images");
        expect(spirit.props).toEqual({
          rover: "spirit",
          token: "v3AqJhzni7HLy5MJ8rUQGAx61xCyxbCySRcIzgsC",
          start: new Date(2004, 0, 4),
          end: new Date(2010, 2, 21)
        });
    });

    it("should have imagepage mapped to '/rovers/opportunity/images'", () => {
        const opportunity = routes.find(route => route.path === "/rovers/opportunity/images");
        expect(opportunity.component).toBe(ImagePage);
    });

    it("should pass in correct props to opportunity page", () => {
        const opportunity = routes.find(route => route.path === "/rovers/opportunity/images");
        expect(opportunity.props).toEqual({
          rover: "opportunity",
          token: "v3AqJhzni7HLy5MJ8rUQGAx61xCyxbCySRcIzgsC",
          start: new Date(2004, 0, 25),
          end: new Date(2018, 5, 11)
        });
    });

});
