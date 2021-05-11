# Other

> <a href="https://github.com/CB279/vue-3-cb-validate">validate</a>

> <a href="https://github.com/CB279/vue-3-cb-alert">alert</a>

> <a href="https://github.com/CB279/vue-3-cb-modal">modal</a>

> <a href="https://github.com/CB279/vue-3-cb-datepicker">datepicker</a>

> <a href="https://github.com/CB279/vue-3-cb-select">select</a>

> <a href="https://github.com/CB279/vue-3-cb-grid">grid</a>

> <a href="https://github.com/CB279/vue-3-cb-paginate">paginate</a>

## Development

npm install @vue-cb/side-nav

## Config

```js
import sidenav from "@vue-cb/side-nav";

createApp(app).use(sidenav);
```

## Usage

```html
<v-side-navs auto-close class="sidenav">
    <v-side-nav to="/book" unlink>
        BOOK
        <template #children>
            <v-side-nav-label> LABEL LIST BOOK </v-side-nav-label>
            <v-side-nav to="/book/php"> PHP </v-side-nav>
            <v-side-nav to="/book/vb"> VB </v-side-nav>
            <v-side-nav to="/book/java"> JAVA </v-side-nav>
            <v-side-nav to="/book/javascript" unlink>
                JAVASCRIPT
                <template #children>
                    <v-side-nav to="/book/javascript/react"> REACT </v-side-nav>
                    <v-side-nav to="/book/javascript/vue"> VUE </v-side-nav>
                </template>
            </v-side-nav>
        </template>
    </v-side-nav>
    <v-side-nav to="/fruit" unlink>
        FRUIT
        <template #children>
            <v-side-nav to="/fruit/mango"> MANGO </v-side-nav>
            <v-side-nav to="/fruit/apple"> APPLE </v-side-nav>
        </template>
    </v-side-nav>
</v-side-navs>
```

```css
.sidenav {
    position: fixed;
    left: 0;
    top: 0;
    padding: 10px 0;
    width: 200px;
    box-shadow: 0 1px 3px 2px #ddd;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
}
.sidenav .side-nav-label {
    text-align: left;
    color: #adadad;
    font-size: 12px;
}
.sidenav .ex-active > a.side-nav-link,
.sidenav .active > a.side-nav-link {
    color: #ff5722;
}
.sidenav .side-nav-link {
    padding: 0 5px;
    height: 30px;
    font-size: 12px;
}
.sidenav .side-nav-link > label {
    cursor: pointer;
    padding-left: 15px;
}
.pad-l {
    padding-left: 15px;
}
.sidenav .side-nav-link:hover {
    color: rgb(28, 145, 153);
}
.sidenav [side-nav-level] {
    padding-left: calc(var(--level) * 15px);
}
```

## Props (navs)

| name      | value   | default |
| --------- | ------- | ------- |
| autoClose | boolean | -       |

## Props (nav)

| name      | value   | default |
| --------- | ------- | ------- |
| to        | string  | -       |
| unlink    | boolean | -       |
| linkStyle | string  | -       |

## 📑 License

[MIT License](./LICENSE)
