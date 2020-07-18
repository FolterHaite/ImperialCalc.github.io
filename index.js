$(document).ready(function () {
    $('#calculationForm').submit(function (e) {
        e.preventDefault();

        var population =  parseInt($("input[name=popInput]").val(), 10);//население
        var popGrowth =  parseInt($("input[name=popGrowthInput]").val(), 10);//рост
        var centralisation =  parseInt($("input[name=centrInput]").val(), 10);//Централизация
        var agricult = parseInt($("input[name=agriInput]").val(), 10);//СХ оборот
        var efficiency = parseInt($("input[name=efficiencyInput]").val(), 10);//эффективность управления(%)
        var agriTax = parseInt($("input[name=agriTaxInput]").val(), 10);//Сельский налог (%)
        var rawExtr = parseInt($("input[name=rawExInput]").val(), 10);//оборот добычи
        var rawExtrEfficiency = efficiency;//эффективность добычи
        var rawExtrTax = parseInt($("input[name=rawExTaxInput]").val(), 10);//%налога добычи

        var newPopulation = population * (popGrowth * 0.01) + population;      //новое население

        var industry = parseInt($("input[name=indInput]").val(), 10);//оборот производства
        var industryEfficiency = efficiency;//эффективность производства
        var industryTax = parseInt($("input[name=indTaxInput]").val(), 10);//Налог с производства


        var services = parseInt($("input[name=servInput]").val(), 10);//Оборот сферы услуг
        var servicesEfficiency = efficiency;//эффективность сферы услуг
        var servicesTax = parseInt($("input[name=servTaxInput]").val(), 10);//Налог сферы услуг
        var tolls = parseInt($("input[name=tollInput]").val(), 10);
        var econOpenness = parseInt($("input[name=econOpenInput]").val(), 10);//Открытость экономики

        var basicGrowth = 0.1;//Базовый прирост
        var literacy = parseInt($("input[name=literacyInput]").val(), 10);//Грамотность
        var higherEdPercent = parseInt($("input[name=higherEdInput]").val(), 10);//Доля людей с высшим образованием
        var manufacturability = parseInt($("input[name=manufactInput]").val(), 10);//Технологичность
        var profitability = parseInt($("input[name=profitInput]").val(), 10);//Рентабельность
        var oldBalance = parseInt($("input[name=prevAmountInput]").val(), 10); //Старая казна

        var agriGrowth_ref = parseInt($("input[name=agriGrowthInput]").val(), 10); //судейские приросты по отраслям
        var rawExtGrowth_ref = parseInt($("input[name=rawExGrowthInput]").val(), 10);
        var indGrowth_ref = parseInt($("input[name=indGrowthInput]").val(), 10);
        var servGrowth_ref = parseInt($("input[name=servGrowthInput]").val(), 10);


        var baseIncome = agricult*agriTax/100*centralisation/100*efficiency/100+rawExtr*rawExtrEfficiency/100*rawExtrTax/100*centralisation/100+industry*industryEfficiency/100*industryTax/100*centralisation/100+services*servicesEfficiency/100*servicesTax/100*(centralisation/100)+(agricult+rawExtr+industry+services)*(econOpenness/100)*(centralisation/100)*tolls/100*efficiency/100;   //Базовый доход
        var agriGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+agriGrowth_ref/100-agriTax/100; //СХ рост
        var rawExtGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+rawExtGrowth_ref/100-rawExtrTax/100; //рост добычи
        var industryGrowth = basicGrowth+literacy/50000+higherEdPercent/5000+manufacturability/5000+profitability/5000+econOpenness/5000+indGrowth_ref/100-industryTax/100; //рост производства
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
        var newExchange = (newAgriculture+newRawExtr+newIndustry+newServices)*econOpenness; //оборот торговли
        var newTreasury = oldBalance + overallIncome;//Новая казна

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

        /* вот ниже всё по второму кругу тупо идёт, это какой-то ритуал у него? t.Немиров */
 
        var overallAdminExpense = adminExpense_agri+adminExpense_rawExtr+adminExpense_industry+adminExpense_services+adminExpense_exchange; //адм расходы

        var overallIncome = baseIncome-overallAdminExpense;//Общий доход
        newAgriculture = agricult*(1+1*agriGrowth);// новые обороты
        newRawExtr = rawExtr*(1+1*rawExtGrowth);
        newIndustry = industry*(1+1*industryGrowth);
        newServices = services*(1+1*serviceGrowth);
        newExchange = (newAgriculture+newRawExtr+newIndustry+newServices)*econOpenness; 

        newTreasury = oldBalance + overallIncome;                     //Новая казна
        y=y+1;
        newTreasury = newTreasury ^ 0;// округление рабочее
        newPopulation = newPopulation ^ 0;  //население
        agriGrowth = agriGrowth ^ 0;  //РОСТЫ
        rawExtGrowth = rawExtGrowth ^ 0;
        industryGrowth = industryGrowth ^ 0;
        serviceGrowth = serviceGrowth ^ 0;
        overallAdminExpense = overallAdminExpense ^ 0;
        overallIncome = overallIncome ^ 0;

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


});

    // Не даёт ввести в инпуты всё кроме цифр и точек
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