$(document).ready(function () {
    $('#calculationForm').submit(function (e) {
        e.preventDefault();

        var population =  parseInt($("input[name=popInput]").val(), 10);//население
        var popGrowth =  parseFloat($("input[name=popGrowthInput]").val());//рост
        var centralisation =  parseFloat($("input[name=centrInput]").val());//Централизация
        var agricult = parseInt($("input[name=agriInput]").val(), 10);//СХ оборот
        var efficiency = parseFloat($("input[name=efficiencyInput]").val());//эффективность управления(%)
        var agriTax = parseFloat($("input[name=agriTaxInput]").val());//Сельский налог (%)
        var rawExtr = parseInt($("input[name=rawExInput]").val(), 10);//оборот добычи
        var rawExtrEfficiency = efficiency;//эффективность добычи
        var rawExtrTax = parseFloat($("input[name=rawExTaxInput]").val());//%налога добычи

        var industry = parseInt($("input[name=indInput]").val(), 10);//оборот производства
        var industryEfficiency = efficiency;//эффективность производства
        var industryTax = parseFloat($("input[name=indTaxInput]").val());//Налог с производства


        var services = parseInt($("input[name=servInput]").val(), 10);//Оборот сферы услуг
        var servicesEfficiency = efficiency;//эффективность сферы услуг
        var servicesTax = parseFloat($("input[name=servTaxInput]").val());//Налог сферы услуг
        var tolls = parseFloat($("input[name=tollInput]").val());
        var econOpenness = parseFloat($("input[name=econOpenInput]").val());//Открытость экономики

        var basicGrowth = 0.1;//Базовый прирост
        var literacy = parseFloat($("input[name=literacyInput]").val());//Грамотность
        var higherEdPercent = parseFloat($("input[name=higherEdInput]").val());//Доля людей с высшим образованием
        var manufacturability = parseFloat($("input[name=manufactInput]").val());//Технологичность
        var profitability = parseFloat($("input[name=profitInput]").val());//Рентабельность
        var oldBalance = parseFloat($("input[name=prevAmountInput]").val()); //Старая казна
        
         var agriSpets = parseFloat($("input[name=agriSpetsInput]").val());
        var rawSpets = parseFloat($("input[name=rawSpetsInput]").val());
        var indSpets = parseFloat($("input[name=indSpetsInput]").val());

        var agriGrowth_ref = parseFloat($("input[name=agriGrowthInput]").val()); //судейские приросты по отраслям
        var rawExtGrowth_ref = parseFloat($("input[name=rawExGrowthInput]").val());
        var indGrowth_ref = parseFloat($("input[name=indGrowthInput]").val());
        var servGrowth_ref = parseFloat($("input[name=servGrowthInput]").val());
        
        var a = 0; //константа для специалитетов агр
        var ax = 1;
        var p = 0;
        var px = 0.5;
        var r = 0; //константа для специалитетов доб
        var rx = 0.7;
        var i = 0; //константа для специалитетов инд
        var ix = 0.7;
        
        for ( a = 0; a < agriSpets; a++) {
        ax += ax * 0.6 ** (a - 1);
        }
        If(agriSpets = 0)
        {
        ax = 0;
        }
          
        for ( p = 0; a < agriSpets; p++) {
        px += px * 0.6 ** (p - 1);
        }
        If(agriSpets = 0)
        {
        px = 0;
        }
            
        for ( r = 0; a < rawSpets; r++) {
        rx += rx * 0.6 ** (r - 1);
        }
        If(rawSpets = 0)
        {
        rx = 0;
        }
          
        for ( i = 0; a < indSpets; i++) {
        ix += ix * 0.6 ** (i - 1);
        }
        If(indSpets = 0)
        {
        ix = 0;
        }
           
        var newPopulation = population * (popGrowth * 0.01+ px/100) + population;      //новое население

        var baseIncome = agricult*agriTax/100*centralisation/100*efficiency/100+rawExtr*rawExtrEfficiency/100*rawExtrTax/100*centralisation/100+industry*industryEfficiency/100*industryTax/100*centralisation/100+services*servicesEfficiency/100*servicesTax/100*(centralisation/100)+(agricult+rawExtr+industry+services)*(econOpenness/100)*(centralisation/100)*tolls/100*efficiency/100;   //Базовый доход
        var agriGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+agriGrowth_ref/100-agriTax/100+ax/100; //СХ рост
        var rawExtGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+rawExtGrowth_ref/100-rawExtrTax/100+rx/100; //рост добычи
        var industryGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+indGrowth_ref/100-industryTax/100+ix/100; //рост производства
        var serviceGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+servGrowth_ref/100-servicesTax/100; //рост услуги

        var exchangeGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000-tolls/100; //рост торговли

        var adminExpense_agri = ((agricult*agriTax/100*centralisation/100*efficiency/100)+(agricult*agriTax/100*centralisation/100*efficiency/100)*agriGrowth)*((2.72**(centralisation/efficiency))/10); // административные расходы с/х
        var adminExpense_rawExtr = ((rawExtr*rawExtrEfficiency/100*rawExtrTax/100*centralisation/100)+((rawExtr*rawExtrEfficiency/100*rawExtrTax/100*centralisation/100)*rawExtGrowth))*((2.72**((centralisation)/(efficiency)))/10); // административные расходы добыча
        var adminExpense_industry = ((industry*industryEfficiency/100*industryTax/100*centralisation/100)+(industry*industryEfficiency/100*industryTax/100*centralisation/100)*industryGrowth)*((2.72**((centralisation)/(efficiency)))/10); // административные расходы производства
        var adminExpense_services = ((services*servicesEfficiency/100*servicesTax/100*(centralisation/100))+(services*servicesEfficiency/100*servicesTax/100*(centralisation/100))*serviceGrowth)*((2.72**((centralisation)/(efficiency)))/10); // административные расходы услуги
        var adminExpense_exchange = (((agricult+rawExtr+industry+services)*(econOpenness/100)*(centralisation/100)*tolls/100*efficiency/100)+((agricult+rawExtr+industry+services)*(econOpenness/100)*(centralisation/100)*tolls/100*efficiency/100)*exchangeGrowth)*((2.72**((centralisation)/(efficiency)))/10); // административные расходы торговля

        var overallAdminExpense = adminExpense_agri+adminExpense_rawExtr+adminExpense_industry+adminExpense_services+adminExpense_exchange; //адм расходы

        var overallIncome = baseIncome-overallAdminExpense;//Общий доход
        var newAgriculture = agricult*(1+1*agriGrowth);// новые обороты по отраслям
        var newRawExtr = rawExtr*(1+1*rawExtGrowth);
        var newIndustry = industry*(1+1*industryGrowth);
        var newServices = services*(1+1*serviceGrowth);
        var newExchange = (newAgriculture+newRawExtr+newIndustry+newServices)*econOpenness/100; //оборот торговли
        var newTreasury = oldBalance + overallIncome;//Новая казна
        var sciencePoints = newPopulation*(literacy/100)*0.00000035+newPopulation*(higherEdPercent/100)*0.0000083+(literacy+higherEdPercent)*(manufacturability/100)

        // Задача - реализовать кнопку "следующий год"
        // population=newPopulation; higherEdPercent=newTreasury; industryTax=baseIncome;

        newTreasury = newTreasury ^ 0;// округление рабочее
        newPopulation = newPopulation ^ 0;  //население
        agriGrowth = agriGrowth ^ 0;  //РОСТЫ
        rawExtGrowth = rawExtGrowth ^ 0;
        industryGrowth = industryGrowth ^ 0;
        serviceGrowth = serviceGrowth ^ 0;
        overallAdminExpense = overallAdminExpense ^ 0;
        overallIncome = overallIncome ^ 0;
        sciencePoints = sciencePoints ^ 0

        ////////////////////////////////////////////////////////////
        //ВЫВОДНЫЕ ДАННЫЕ//
        ////////////////////////////////////////////////////////////

        //имена полей аутпута не трогал, потому что ну нахуй
        $("output[name=pop]").val(newPopulation);
        $("output[name=baseIncome]").val(baseIncome);
        $("output[name=AdminRash]").val(overallAdminExpense);
        $("output[name=income]").val(overallIncome);
        $("output[name=fullBudget]").val(newTreasury);
        $("output[name=nti1]").val(newAgriculture);
        $("output[name=nti2]").val(newRawExtr);
        $("output[name=nti3]").val(newIndustry);
        $("output[name=nti4]").val(newServices);
        $("output[name=nti5]").val(newExchange);
        $("output[name=sciencePoints]").val(sciencePoints);

});

    // Не даёт ввести в инпуты всё кроме цифр и точек
    $('.enterData').on('change keyup', function() {
        // Remove invalid characters
        var sanitized = $(this).val().replace(/[^0-9.-]/g, '');
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
