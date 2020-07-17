$(document).ready(function () {
    $('#calculationForm').submit(function () {
        var d = document;
        var a1 = Number(d.form1.num1.value);//население
        var a2 = Number(d.form1.num3.value);//рост
        var a14 = Number(d.form1.num2.value);//Централизация
        var shob = Number(d.form1.num4.value);//СХ оборот
        var a4 = Number(d.form1.num5.value);//эффективность управления(%)
        var a5 = Number(d.form1.num6.value);//Сельский налог (%)
        var a6 = Number(d.form1.num7.value);//оборот добычи
        var a7 = a4;//эффективность добычи
        var a8 = Number(d.form1.num9.value);//%налога добычи

        var p = a1 * (a2 *0.01) + a1;      //новое население

        var a9 = Number(d.form1.num10.value);//оборот производства
        var a10 = a4;//эффективность производства
        var a11 = Number(d.form1.num12.value);//Налог с производства


        var a12 = Number(d.form1.num13.value);//Оборот сферы услуг
        var a13 = a4;//эффективность сферы услуг
        var nsu = Number(d.form1.nsu.value);//Налог сферы услуг
        var posh = Number(d.form1.posh.value);
        var oe = Number(d.form1.oe.value);//Открытость экономики

        var a15 = 0.1;//Базовый прирост
        var a17 = Number(d.form1.num17.value);//Грамотность
        var a18 = Number(d.form1.num18.value);//Доля людей с высшим образованием
        var a19 = Number(d.form1.num19.value);//Технологичность
        var a22 = Number(d.form1.num22.value);//Рентабельность
        var y = Number(d.form1.num20.value);//Год подсчета доходов
        var balance = Number(d.form1.balance.value); //Старая казна

        var part = Number(d.form1.part.value);
        var vc = Number(d.form1.vc.value);
        var bonus = Number(d.form1.bonus.value);
        var q = Number(d.form1.q.value);
 
        var v = part*(1+bonus/100)*q*(1+a19/100);
        var cena = vc*(1-(part/100+bonus/250));
        var maxpart = 10*(1+a19/100+a22/100+a18/100);
        var sto = v*cena;

        var sud1 = Number(d.form1.sud1.value);
        var sud2 = Number(d.form1.sud2.value);
        var sud3 = Number(d.form1.sud3.value);
        var sud4 = Number(d.form1.sud4.value);


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

        d.form1.pop.value = p;
        d.form1.baseIncome.value = t;
        d.form1.AdminRash.value = rash;
        d.form1.income.value = inc;
        d.form1.fullBudget.value = fb;
        d.form1.newYear.value=y;
        d.form1.nti1.value=nti1;
        d.form1.nti2.value=nti2;
        d.form1.nti3.value=nti3;
        d.form1.nti4.value=nti4;
        d.form1.nti5.value=nti5;
        
        d.form1.cena.value=cena;
        d.form1.sto.value=sto;
        d.form1.v.value=v;  

        d.form1.maxpart.value=maxpart;  
 
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

        d.form1.pop.value = p;
        d.form1.baseIncome.value = t;
        d.form1.AdminRash.value = rash;
        d.form1.income.value = inc;
        d.form1.fullBudget.value = fb;
        d.form1.newYear.value=y;
        d.form1.nti1.value=nti1;
        d.form1.nti2.value=nti2;
        d.form1.nti3.value=nti3;
        d.form1.nti4.value=nti4;
        d.form1.nti5.value=nti5;
        d.form1.cena.value=cena;
        d.form1.sto.value=sto;
        d.form1.v.value=v;
        d.form1.maxpart.value=maxpart;
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