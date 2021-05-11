import vSideNavs from "../components/side-navs";
import vSideNav from "../components/side-nav";
import vSideNavLabel from "../components/side-nav-label";
import "../css/index.css";

export default {
    install(app) {
        app.component("vSideNavs", vSideNavs);
        app.component("vSideNav", vSideNav);
        app.component("vSideNavLabel", vSideNavLabel);
    }
};
