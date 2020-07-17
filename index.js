$(document).ready(function () {
    $('#calculationForm').submit(function (e) {
        e.preventDefault();

        var frm = $('form[name="form1"]');
        parseInt($("input[name=num1]").val(), 10)
        var a1 =  parseInt($("input[name=num1]").val(), 10);//население
        var a2 =  parseInt($("input[name=num3]").val(), 10);//рост
        var a14 =  parseInt($("input[name=num2]").val(), 10);//Централизация
        var shob = parseInt($("input[name=num4]").val(), 10);//СХ оборот
        var a4 = parseInt($("input[name=num5]").val(), 10);//эффективность управления(%)
        var a5 = parseInt($("input[name=num6]").val(), 10);//Сельский налог (%)
        var a6 = parseInt($("input[name=num7]").val(), 10);//оборот добычи
        var a7 = a4;//эффективность добычи
        var a8 = parseInt($("input[name=num9]").val(), 10);//%налога добычи

        var p = a1 * (a2 *0.01) + a1;      //новое население

        var a9 = parseInt($("input[name=num10]").val(), 10);//оборот производства
        var a10 = a4;//эффективность производства
        var a11 = parseInt($("input[name=num12]").val(), 10);//Налог с производства


        var a12 = parseInt($("input[name=num13]").val(), 10);//Оборот сферы услуг
        var a13 = a4;//эффективность сферы услуг
        var nsu = parseInt($("input[name=nsu]").val(), 10);//Налог сферы услуг
        var posh = parseInt($("input[name=posh]").val(), 10);
        var oe = parseInt($("input[name=oe]").val(), 10);//Открытость экономики

        var a15 = 0.1;//Базовый прирост
        var a17 = parseInt($("input[name=num17]").val(), 10);//Грамотность
        var a18 = parseInt($("input[name=num18]").val(), 10);//Доля людей с высшим образованием
        var a19 = parseInt($("input[name=num19]").val(), 10);//Технологичность
        var a22 = parseInt($("input[name=num22]").val(), 10);//Рентабельность
        var y = parseInt($("input[name=num20]").val(), 10);//Год подсчета доходов
        var balance = parseInt($("input[name=balance]").val(), 10); //Старая казна

        var part = parseInt($("input[name=part]").val(), 10);
        var vc = parseInt($("input[name=vc]").val(), 10);
        var bonus = parseInt($("input[name=bonus]").val(), 10);
        var q = parseInt($("input[name=q]").val(), 10);
 
        var v = part*(1+bonus/100)*q*(1+a19/100);
        var cena = vc*(1-(part/100+bonus/250));
        var maxpart = 10*(1+a19/100+a22/100+a18/100);
        var sto = v*cena;

        var sud1 = parseInt($("input[name=sud1]").val(), 10);
        var sud2 = parseInt($("input[name=sud2]").val(), 10);
        var sud3 = parseInt($("input[name=sud3]").val(), 10);
        var sud4 = parseInt($("input[name=sud4]").val(), 10);


        var t = shob*a5/100*a14/100*a4/100+a6*a7/100*a8/100*a14/100+a9*a10/100*a11/100*a14/100+a12*a13/100*nsu/100*(a14/100)+(shob+a6+a9+a12)*(oe/100)*(a14/100)*posh/100*a4/100;   //Базовый доход
        var ti1 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud1/100-a5/100; //СХ рост
        var ti2 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud2/100-a8/100; //рост добычи
        var ti3 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud3/100-a11/100; //рост производства
        var ti4 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud4/100-nsu/100; //рост услуги

        var ti5 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000-posh/100; //рост торговли

        var rash1 = ((shob*a5/100*a14/100*a4/100)+(shob*a5/100*a14/100*a4/100)*ti1)*((2.72**(a14/a4))/10); // административные расходы с/х
        var rash2 = ((a6*a7/100*a8/100*a14/100)+((a6*a7/100*a8/100*a14/100)*ti2))*((2.72**((a14)/(a4)))/10); 
        var rash3 = ((a9*a10/100*a11/100*a14/100)+(a9*a10/100*a11/100*a14/100)*ti3)*((2.72**((a14)/(a4)))/10); // административные расходы производства
        var rash4 = ((a12*a13/100*nsu/100*(a14/100))+(a12*a13/100*nsu/100*(a14/100))*ti4)*((2.72**((a14)/(a4)))/10); // административные расходы услуги
        var rash5 = (((shob+a6+a9+a12)*(oe/100)*(a14/100)*posh/100*a4/100)+((shob+a6+a9+a12)*(oe/100)*(a14/100)*posh/100*a4/100)*ti5)*((2.72**((a14)/(a4)))/10); 

        var rash = rash1+rash2+rash3+rash4+rash5; //адм расходы

        var inc = t-rash;//Общий доход
        nti1 = shob*(1+1*ti1);// новые обороты
        nti2 = a6*(1+1*ti2);
        nti3 = a9*(1+1*ti3);
        nti4 = a12*(1+1*ti4);
        nti5 = (nti1+nti2+nti3+nti4)*oe;
        var fb = balance + inc;                     //Новая казна
        // Задача - реализовать кнопку "следующий год"
        // a1=p; a18=fb; a11=t;
        fb = fb ^ 0;// округление рабочее
        p = p ^ 0;  //население
        ti1 = ti1 ^ 0;  //РОСТЫ
        ti2 = ti2 ^ 0;
        ti3 = ti3 ^ 0;
        ti4 = ti4 ^ 0;
        rash = rash ^ 0;
        inc = inc ^ 0;
        // fb=inc.toFixed();
        // fb=fb.toFixed(); строковое округление
        // fb=math.round(+,fb) нерабочее огругление
        ////////////////////////////////////////////////////////////
        //ВЫВОДНЫЕ ДАННЫЕ//
        ////////////////////////////////////////////////////////////

        $("output[name=pop]").val(p);
        $("output[name=baseIncome]").val(t);
        $("output[name=AdminRash]").val(rash);
        $("output[name=income]").val(inc);
        /* frm.fullBudget.value = fb; */ $("output[name=fullBudget]").val(fb);
        /* frm.newYear.value=y; $("output[name=newYear]").val(y); */
        /*frm.nti1.value=nti1;*/ $("output[name=nti1]").val(nti1);
        /*frm.nti2.value=nti2;*/ $("output[name=nti2]").val(nti2);
        /*frm.nti3.value=nti3;*/ $("output[name=nti3]").val(nti3);
        /*frm.nti4.value=nti4;*/ $("output[name=nti4]").val(nti4);
        /*frm.nti5.value=nti5;*/ $("output[name=nti5]").val(nti5);
        
/*         frm.cena.value=cena; 
        frm.sto.value=sto;
        frm.v.value=v;  

        frm.maxpart.value=maxpart;   */
 
        var rash = rash1+rash2+rash3+rash4+rash5; //адм расходы

        var inc = t-rash;//Общий доход
        nti1 = shob*(1+1*ti1);// новые обороты
        nti2 = a6*(1+1*ti2);
        nti3 = a9*(1+1*ti3);
        nti4 = a12*(1+1*ti4);
        nti5 = (nti1+nti2+nti3+nti4)*oe; 

        fb = balance + inc;                     //Новая казна
        y=y+1;
        fb = fb ^ 0;// округление рабочее
        p = p ^ 0;  //население
        ti1 = ti1 ^ 0;  //РОСТЫ
        ti2 = ti2 ^ 0;
        ti3 = ti3 ^ 0;
        ti4 = ti4 ^ 0;
        rash = rash ^ 0;
        inc = inc ^ 0;

        $("output[name=pop]").val(p);
        $("output[name=baseIncome]").val(t);
        $("output[name=AdminRash]").val(rash);
        $("output[name=income]").val(inc);
        /* frm.fullBudget.value = fb; */ $("output[name=fullBudget]").val(fb);
        /* frm.newYear.value=y; $("output[name=newYear]").val(y); */
        /*frm.nti1.value=nti1;*/ $("output[name=nti1]").val(nti1);
        /*frm.nti2.value=nti2;*/ $("output[name=nti2]").val(nti2);
        /*frm.nti3.value=nti3;*/ $("output[name=nti3]").val(nti3);
        /*frm.nti4.value=nti4;*/ $("output[name=nti4]").val(nti4);
        /*frm.nti5.value=nti5;*/ $("output[name=nti5]").val(nti5);
 /*        frm.cena.value=cena;
        frm.sto.value=sto;
        frm.v.value=v;
        frm.maxpart.value=maxpart; */


});

/* var allowedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 188, 190]

    $('input[type=number]').on('keydown', function(e) {
        if (jQuery.inArray(e, allowedKeyCodes) == -1) {
            e.preventDefault();
        }
    }); */

    // Catch all events related to changes
    $('.enterData').on('change keyup', function() {
        // Remove invalid characters
        var sanitized = $(this).val().replace(/[^0-9.]/g, '');
        sanitized = sanitized.replace(/\.(?=.*\.)/, '');
        // Update value
        $(this).val(sanitized);
      });

},

function copyData(containerid) {
    var range = document.createRange();
    range.selectNode(containerid);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
})

/*         niext.onclick = function nextYear() {
            a1=p;
            a18=fb;

           p = a1 * (a2 *0.01) + a1;
           var t = shob*a5/100*a14/100*a4/100+a6*a7/100*a8/100*a14/100+a9*a10/100*a11/100*a14/100+a12*a13/100*nsu/100*(a14/100)+(shob+a6+a9+a12)*(oe/100)*(a14/100)*posh/100*a4/100;   //Базовый доход
        var ti1 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud1/100-a5/100; //СХ рост
        var ti2 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud2/100-a8/100; //рост добычи
        var ti3 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud3/100-a11/100; //рост производства
        var ti4 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000+sud4/100-nsu/100; //рост услуги

        var ti5 = a15+a17/50000+a18/5000+a19/5000+a22/5000+oe/5000-posh/100; //рост торговли

        var rash1 = ((shob*a5/100*a14/100*a4/100)+(shob*a5/100*a14/100*a4/100)*ti1)*((2.72**((a14)/(a4))/10)); // административные расходы с/х
        var rash2 = ((a6*a7/100*a8/100*a14/100)+((a6*a7/100*a8/100*a14/100)*ti2))*((2.72**((a14)/(a4))/10)); 
        var rash3 = ((a9*a10/100*a11/100*a14/100)+(a9*a10/100*a11/100*a14/100)*(ti3))*((2.72**((a14)/(a4))/10)); // административные расходы производства
        var rash4 = ((a12*a13/100*nsu/100*(a14/100))+(a12*a13/100*nsu/100*(a14/100))*(ti4))*((2.72**((a14)/(a4))/10)); // административные расходы услуги
        var rash5 = ((((shob+a6+a9+a12)*(oe/100)*(a14/100)*posh/100*a4/100)+((shob+a6+a9+a12)*(oe/100)*(a14/100)*posh/100*a4/100)*ti5))*((2.72**(a14/a4))/10); 
 */
