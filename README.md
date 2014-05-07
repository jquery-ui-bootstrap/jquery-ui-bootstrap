#jQuery UI Bootstrap (v 1.0 Alpha)

This project was started to bring the beauty and ease-of-use of Bootstrap to jQuery UI widgets ♥.


##Why?

Bootstrap is one of our favorite projects, but having used it regularly it left us wanting two things:

* The ability to work side-by-side with jQuery UI (something which caused a number of widgets to break visually)
* The ability to theme jQuery UI widgets using Bootstrap styles. Whilst we love jQuery UI, we find some of the current themes to look a little dated. Our hope is that this theme provides a decent alternative for others that feel the same.

To clarify, this project doesn't aim or intend to replace Bootstrap. It merely provides a jQuery UI-compatible theme inspired by Bootstrap's design. It also provides a version of Bootstrap CSS with a few (minor) sections commented out which enable the theme to work alongside it.

We welcome any and all feedback as we would very much like this theme to be as solid as possible.

##Browser support

All modern browsers are targeted by this theme with 'lo-res' experiences (i.e no gradients, border-radius etc.) provided for users using older browsers. 

There *are* some minor known issues lingering that we're working on, but the hope is that in time those will all get ironed out. 

##jQuery UI support

This theme targets jQuery UI 1.10.3 (stable) and 1.9.2 (legacy), along with the default version of jQuery included in the (current) jQuery UI builds (jQuery 1.6+).

##Project status

This project is under active, but slow development. There has been a great deal of work done in branches to introduce compatibility with jQuery UI 1.9 and further work done to move us towards using LESS and improved parity with Bootstrap 3.x.

At this time, we are seeking contributors interested in helping us to finally complete the work needed to be Bootstrap 3.x compatible. This would involve helping in your spare time across a few weeks and you would be given credit in the project README. 

As one of the (currently) more popular open-source jQuery UI themes we would love to get out more frequent releases and your help with this would be greatly appreciated.

##Team

* Lead Product Developer : [Addy Osmani](https://github.com/addyosmani) 
* Chief Maintainer : [Gerits Aurelien](https://github.com/gtraxx)

## Contributor

* Less Support : [Vijay Dharap](https://github.com/dharapvj)
* You? ;) We're always open to improvements.

##Demo

For a live preview of the current theme, see [http://jquery-ui-bootstrap.github.io/jquery-ui-bootstrap/](http://jquery-ui-bootstrap.github.io/jquery-ui-bootstrap/).

### Synchronize your fork

    cd your_fork

    git remote add your_fork git@github.com:addyosmani/jquery-ui-bootstrap.git
    git fetch jquery-ui-bootstrap

    #Merge your local copy with the original project
    git checkout gh-pages
    git merge jquery-ui-bootstrap/gh-pages

    #Commit your changes
    git commit -a -m "Synchronization with the original"

    #Send your changes to github
    git push

### rock on node.js bandwagon!
```Shell
<<install node>>
cd your_fork

# install modules (or globally with -g switch)
npm install

# run local webserver to see the pages.
node server.js

# compile your LESS changes to create a new css file
cd less
lessc -x style.less > style.min.css
lessc -x style2.less > style2.min.css
```	

	

##Licence

    The MIT License (MIT)

    jQuery UI Bootstrap © Addy Osmani 2012 - 2013.

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
    and associated documentation files (the “Software”), 
    to deal in the Software without restriction, including without limitation the rights to use, 
    copy, modify, merge, publish, distribute, sublicense, 
    and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of 
    the Software
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
    ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR 
    THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[The MIT License (MIT)](http://mit-license.org/) 
