/*
 *made by @TETH_Main
 *
 *
 * Latest v1.0b1 https://www.desmos.com/calculator/ecrc6rtwan
 *
 * v1.0b1 https://www.desmos.com/calculator/ecrc6rtwan
 */

 if (window.location.href.includes("desmos.com/calculator")) {
    if (typeof Calc != "undefined") {
        var DesmosPaintPro = {};
        var i = 0;

        DesmosPaintPro.rgb = function(H, S, V) {

            var C = V * S;
            var Hp = H / 60;
            var X = C * (1 - Math.abs(Hp % 2 - 1));

            var R, G, B;
            if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
            if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
            if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
            if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
            if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
            if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

            var m = V - C;
            [R, G, B] = [R+m, G+m, B+m];

            R = Math.floor(R * 255);
            G = Math.floor(G * 255);
            B = Math.floor(B * 255);

            return [R, G, B];
        }

        DesmosPaintPro.hex = function (c) {
            if (c < 16) {
                return "0" + c.toString(16);
            } else {
                return c.toString(16);
            }
        }

        DesmosPaintPro.set = function() {

            var id = DesmosPaintPro.getId("l_{ock}");
            var lock = Calc.expressionAnalysis[id];
            var values = lock.evaluation.value;

            var P0id = DesmosPaintPro.getId("P_{0}");
            var P0 = DesmosPaintPro.getExpression(P0id);
            var P1id = DesmosPaintPro.getId("P_{1}");
            var P1 = DesmosPaintPro.getExpression(P1id);
            var P2id = DesmosPaintPro.getId("P_{2}");
            var P2 = DesmosPaintPro.getExpression(P2id);

            DesmosPaintPro.setCoordinate(P0.latex, P0id, values[0], values[1]);
            DesmosPaintPro.setCoordinate(P1.latex, P1id, values[2], values[3]);
            DesmosPaintPro.setCoordinate(P2.latex, P2id, values[4], values[5]);
        }

        DesmosPaintPro.setColor = function() {
            i++;
            var colorId = DesmosPaintPro.getId("C_{0}");
            var expr = DesmosPaintPro.getExpression(colorId);

            var idItem = DesmosPaintPro.getId("i_{tem}");
            var item = Calc.expressionAnalysis[idItem];
            var valuesItem = item.evaluation.value;

            var Rgb = DesmosPaintPro.rgb(valuesItem[0], valuesItem[1], valuesItem[2]);

            var hexRed = DesmosPaintPro.hex(Rgb[0]);
            var hexBlue = DesmosPaintPro.hex(Rgb[1]);
            var hexGreen = DesmosPaintPro.hex(Rgb[2]);

            expr.color = "#" + hexRed + hexBlue + hexGreen;
            expr.latex = "C_{" + i + "}=\\operatorname{rgb}\\left(" + Rgb[0] + "," + Rgb[1] + "," + Rgb[2] + "\\right)";
            expr.id = "DesmosPaintPro" + (new Date()).getTime();
            expr.folderId = expr.folderId;
            Calc.setExpression(expr);
        }

        DesmosPaintPro.setCoordinate = function(e, id, value1, value2) {
            var currentlatex = e;
            currentlatex = currentlatex.split("\\right]").join(",\\left(" + value1 + "," + value2 + "\\right)\\right]").split("[,").join("[");
            Calc.setExpression({
                id: id,
                latex: currentlatex
            });
        }

        DesmosPaintPro.getExpression = function(id) {
            var expressions = Calc.getState().expressions.list;
            for (var i = 0; i < expressions.length; i++) {
                if (expressions[i].id === id) return expressions[i]; 
            }
        }

        DesmosPaintPro.getId = function(e) {
            var expressions = Calc.getState().expressions.list;
            for (var i = 0; i < expressions.length; i++) {
                if (expressions[i].latex) if (expressions[i].latex.startsWith(e)) return expressions[i].id;
            }
        }

        DesmosPaintPro.handlerV = function(e) {
            if (e.altKey && ((e.code == "KeyV") || (e.key == "v"))) {
                DesmosPaintPro.set();
            }
        }

        DesmosPaintPro.handlerC = function(e) {
            if (e.altKey && ((e.code == "KeyC") || (e.key == "c"))) {
                DesmosPaintPro.setColor();
            }
        }

        document.addEventListener('keyup', DesmosPaintPro.handlerV);
        document.addEventListener('keyup', DesmosPaintPro.handlerC);
    } else {
        window.alert("uh oh, something went wrong")
    }
} else {
    window.alert("this only works on desmos.com/calculator :v")
}
