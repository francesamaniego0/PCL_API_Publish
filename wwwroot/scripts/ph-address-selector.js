function setInputValue(id, value) {
    const input = document.getElementById(id);
    if (input) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
}
window.initPhAddressSelector = function () {
    document.getElementById('region')?.addEventListener('change', my_handlers.fill_provinces);
    document.getElementById('province')?.addEventListener('change', my_handlers.fill_cities);
    document.getElementById('city')?.addEventListener('change', my_handlers.fill_barangays);
    document.getElementById('barangay')?.addEventListener('change', my_handlers.onchange_barangay);

    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = '<option selected disabled>Choose Region</option>';

    fetch('ph-json/region.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(entry => {
                const option = document.createElement('option');
                option.value = entry.region_code;
                option.textContent = entry.region_name;
                regionSelect.appendChild(option);
            });
        });
    populateAllCitiesInPoliticalDataCity();
};
function populateAllCitiesInPoliticalDataCity() {
    const politicalCitySelect = document.getElementById('politicalDataCity');
    if (!politicalCitySelect) return;

    politicalCitySelect.innerHTML = '<option selected disabled>Choose City/Municipality</option>';

    fetch('ph-json/city.json')
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => a.city_name.localeCompare(b.city_name));
            data.forEach(entry => {
                const option = document.createElement('option');
                option.value = entry.city_code;
                option.textContent = entry.city_name;
                politicalCitySelect.appendChild(option);
            });
        });
}

const my_handlers = {
    fill_provinces: function () {
        const region_code = this.value;
        const region_text = this.options[this.selectedIndex].text;
        document.getElementById('region-text').value = region_text;

        setInputValue('region-text', region_text);
        setInputValue('province-text', '');
        setInputValue('city-text', '');
        setInputValue('barangay-text', '');


        document.getElementById('province-text').value = '';
        document.getElementById('city-text').value = '';
        document.getElementById('barangay-text').value = '';

        const provinceSelect = document.getElementById('province');
        provinceSelect.innerHTML = '<option selected disabled>Choose State/Province</option>';

        document.getElementById('city').innerHTML = '<option selected disabled></option>';
        document.getElementById('barangay').innerHTML = '<option selected disabled></option>';

        fetch('ph-json/province.json')
            .then(res => res.json())
            .then(data => {
                const result = data.filter(val => val.region_code === region_code);
                result.sort((a, b) => a.province_name.localeCompare(b.province_name));
                result.forEach(entry => {
                    const option = document.createElement('option');
                    option.value = entry.province_code;
                    option.textContent = entry.province_name;
                    provinceSelect.appendChild(option);
                });
            });
    },

    fill_cities: function () {
        const province_code = this.value;
        const province_text = this.options[this.selectedIndex].text;
        document.getElementById('province-text').value = province_text;

        setInputValue('province-text', province_text);
        setInputValue('city-text', '');
        setInputValue('barangay-text', '');


        document.getElementById('city-text').value = '';
        document.getElementById('barangay-text').value = '';

        const citySelect = document.getElementById('city');
        citySelect.innerHTML = '<option selected disabled>Choose city/municipality</option>';
        document.getElementById('barangay').innerHTML = '<option selected disabled></option>';

        fetch('ph-json/city.json')
            .then(res => res.json())
            .then(data => {
                const result = data.filter(val => val.province_code === province_code);
                result.sort((a, b) => a.city_name.localeCompare(b.city_name));
                result.forEach(entry => {
                    const option = document.createElement('option');
                    option.value = entry.city_code;
                    option.textContent = entry.city_name;
                    citySelect.appendChild(option);
                });
            });
    },

    fill_barangays: function () {
        const city_code = this.value;
        const city_text = this.options[this.selectedIndex].text;
        document.getElementById('city-text').value = city_text;

        setInputValue('city-text', city_text);
        setInputValue('barangay-text', '');

        document.getElementById('barangay-text').value = '';

        const barangaySelect = document.getElementById('barangay');
        barangaySelect.innerHTML = '<option selected disabled>Choose barangay</option>';

        fetch('ph-json/barangay.json')
            .then(res => res.json())
            .then(data => {
                const result = data.filter(val => val.city_code === city_code);
                result.sort((a, b) => a.brgy_name.localeCompare(b.brgy_name));
                result.forEach(entry => {
                    const option = document.createElement('option');
                    option.value = entry.brgy_code;
                    option.textContent = entry.brgy_name;
                    barangaySelect.appendChild(option);
                });
            });
    },

    onchange_barangay: function () {
        const barangay_text = this.options[this.selectedIndex].text;
        document.getElementById('barangay-text').value = barangay_text;
        setInputValue('barangay-text', barangay_text);
    }
};
window.getCityNameByCode = async function (cityCode) {
    if (!window.cityList) {
        const res = await fetch('ph-json/city.json');
        window.cityList = await res.json();
    }

    const match = window.cityList.find(c => c.city_code === cityCode);
    return match ? match.city_name : '';
};