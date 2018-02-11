<html>
    <head>
        <title>Php Sandbox (<?=gethostname()?>)</title>
        <link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32">
        <link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png">
    </head>
    <body>
        <div class="codeSite">
            <textarea id='codeEditor'></textarea>
            <div>
                <select id="server">
                    <option value="this">This ( <?=gethostname()?> )</option>
                    <?php                    
                    foreach ( $serverList as $key => $val  )
                        echo '<option value="'.$key.'">'.$val['name'].'</option>';
                    ?>
                </select>
                <button id="send">Send</button>
            </div>
        </div><div class="splitter"></div><div class="iframeView"><div class="blockIframe"></div>
            <iframe id="response" frameborder="0"></iframe>
            <textarea id='responseRaw' style="display:none"></textarea>
            <div class="history">
                <i class="icon-left-open back"></i><i class="icon-right-open next"></i>
                <span>-</span>
                <i class="icon-info-circled info"></i>
                <button class="raw"> Raw </button>
            </div>
        </div>
    </body>
    <link rel="stylesheet" href="exsrc/codemirror/lib/codemirror.css">
    <link rel="stylesheet" href="exsrc/codemirror/theme/monokai.css">
    <link rel="stylesheet" href="src/style.css">
    <link rel="stylesheet" href="src/fontello.css">
    <script src="exsrc/codemirror/lib/codemirror.js"></script>
    <script src="exsrc/codemirror/addon/edit/matchbrackets.js"></script>
    <script src="exsrc/codemirror/mode/htmlmixed/htmlmixed.js"></script>
    <script src="exsrc/codemirror/mode/xml/xml.js"></script>
    <script src="exsrc/codemirror/mode/javascript/javascript.js"></script>
    <script src="exsrc/codemirror/mode/css/css.js"></script>
    <script src="exsrc/codemirror/mode/clike/clike.js"></script>
    <script src="exsrc/codemirror/mode/php/php.js"></script>
    <script src="exsrc/jquery.min.js"></script>
    <script src="exsrc/jquery-resizable.js"></script>
    <script src="src/main.js"></script>
</html>