# TGA drilldown js
Simple drilldown menu


### HTML
``` html
<ul role="menu">
    <li>
        <a href="#">Link</a>
        <ul>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
        </ul>
    </li>
    <li><a href="#">Link</a></li>
    <li><a href="#">Link</a></li>
    <li><a href="#">Link</a></li>
    <li>
        <a href="#">Link1</a>
        <ul>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li>
                <a href="#">Link</a>
                <ul>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
``` 
### Create a menu
''' js
jQuery(element).tgadrilldown();


### Options set
''' js

jQuery(element).tgadrilldown();{
                        toggle: '<i class="icon-caret-right"></i>'
                    }

### Settings

Option | Default | Permitted
------ | ------- | -----------
toggle | > | html 
