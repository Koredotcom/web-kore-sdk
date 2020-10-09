(function($){
    function KorePickers(pickerConfig) {
        var pickerSubconfig={
            dateRangeConfig: {
                alwaysOpen: true,
                singleMonth: true,
                showShortcuts: false,
                showTopbar: false,
                format: 'DD-MM-YYYY',
                startDate: '',
                endDate: '',
                inline: true,
                selectForward: true
                // container : $('.dateRangePickerContainer'),
    
            },
            daterangepicker: {
                title: "Please Choose"
            },
            dateConfig: {
                alwaysOpen: true,
                singleMonth: true,
                singleDate: true,
                showShortcuts: false,
                showTopbar: false,
                format: 'MM-DD-YYYY',
                startDate: '',
                endDate: '',
                inline: true,
                // container : $('.dateRangePickerContainer'),
    
            },
            datepicker: {
                title: "Please Choose"
            },
            clockPicker:{
               title:""
            }
    
        };
    var mainConfig=[];
    mainConfig.push(pickerConfig);
    mainConfig.push(pickerSubconfig);
    this.mainConfig = mainConfig;
    this.pickerSubconfig=pickerSubconfig;
    this.chatWindowInstance = mainConfig[0].chatWindowInstance;
    // this.bottomSlider = mainConfig.bottomSlider;
    this.chatConfig = mainConfig[1];
    var _korePickers = mainConfig[0].chatConfig.chatContainer;
    this._korePickers=_korePickers;
}
KorePickers.prototype.showTaskMenuItems=function(actionsData){
    var iconPath='data:image/png;base64,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';
    actionsData={
        "tasks": [{
            "title": "Balance",
            "icon": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAFAAAAAAnxZisAAACvElEQVQ4Ea1UTUhUURQ+5773nKm0VUQLIYkWQdCqtAJLaCP2A5VYgTVKRakpVDMu+jeIwJGkoCmwYTRczcIyghCiVX+bikJwYwt/ykCzMGxGnbmn706OjTDEMONdvHvfuef7zrnfOffynY7uwpm5WFCIykgkj5ZgMPEgWez1nfb0sv9u5zMhKTe8zPQagb7kEgPkB0TEAlnUZl5vg2xngpx4yuXYh5pOVo/mEsAfCD0Bfi/UcMeZi21k70LUN263q7Lx+JGv6cjD4bA1PBGp1SQlzDxqET04V+dJe9K1q1ZUDo1PX4ASV4m0SyUIWcb+Rz408fu5Ft2BrE6I1tfiWvr9ga5N6ZKpqqqaZbI+JfeMRAvDgIT0I1RDOZZ18Oypo+9Hvkc80LSMFN12FzhXZn/pbQj2mEm3A7gLp8tDAj0kVArdW3z1nlsLhFj8PcG8BXI1wHEdMi2Kx+KNxhwXKTFzvuS1NFVXT3nrjvVh/wUJJ+xDE5EdSGA3sCthv258U8eiACB/ldyEhi/NGg4jZp6mue1mDgZ7C3BCI0/CLst0P2r40+wR/8Mn/vFZFKC5oeahYt6syCn2NdQEjZNlWUG07yQC9vgDnX2TMz8GiKRQKfab/eba2m9okI1KWeWuotX7jC11LKqB2fDW17xLdUAdxtrud5eSjrXjhFuJZRSddPl8nSeU9JtvkLQdyMgqBg2B4T5ksL+pomImCcxm9t/rOkNabqIm+Rapw+YmD+BngyFjxTcQ7GM2xCmYIE6KOkF/yG2jMF6swzAuFy0XUxxzWkKRoJGbDUtrKLTGinBxHLc6J1aAlVLCQp9Row+5cmWERw1Cb9GCiUuTESJTJ7ymzGoLXlR+iiIPZ4rL1A+XL+rY9nim/ln7cVug8xKe4bQvY9asADKpqOM4Pht9vwf/S14DtFJ0LhZr/QPYRQ4rZJBHZgAAAABJRU5ErkJggg==',
            "postback": {
              "title": "Balance",
              "value": "Get Balance"
            }
        }, {
            "title": "Transactions",
            "icon": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAADCElEQVQ4EZVVX0hTYRQ/5945caVZaVKJJpFWWFAUPQXu1ZA0Yi/RcvRgXiGi3EqokCCKbUURuzgI5h/sYVAMBz2F+dJTPhSIJVgwCIW0CLWZun2n89151023pAPbd3bO75x7z/md7wwfRqNFV12uRbBINBq1J74tngISZwnwCABVIiEyZAqQRgkgtkU9FGtrO7ZiCTNUJT2bHJJJTUcg1N+UmE2OkxAvgLCRs3wGwEFAGOBkE9IGBNG59NiHoB5pNuPME/2hCD8bX5Wo20/Pp77fEiBuIOAkqthVta1oyOVyLZtgeYbDowXzqfEmAnGXgPYrCvqvXbrQxTmE9BsJDQVxmoh2cmF9hXsq2i43Ni5Jez4x2jKb1Dnmokza2d56XWKzCVcDp7BYrfW63T+tiR709DeKNKjeDnfcapd6QO99aiRFaOnUPDFlDWAXLYh4OBx3WO1pkfYRiptWm6lXlzk0btFHJi8o24GP9IE602meSglOq3a7SM4k7zEZDUzCXuIoZjuBqGredvewiZVnMNR/RkD6OSNctiva+Qmr09QDod4n3HSNWX3NQGZaCoIKtJDR/3wX2w7G51JjP/iBzXK2coo/1PtWOnwdrcdzAtYYA3pkiB9eZ+Om6jxfUW+7Z8SKURQYFoJ8DHzHb2a+1QogjhRWl99fPwX4heOdNmsSq26v3nF7KTGTBKIGthdkfLSVBHUvJ75K0owxydhXvUjc6v+UfK3Ilpwvn2wF39ndf/kJNnHjjzLhutUux4VJOcmte2mULOeutnbzstPpTGWBBDUMqJG/eTFUybHhWzTJjdcd5Y6uLI6VzFWkUlZjRslcxjPk+r2a55wVaOp+PTLCaYt8WusJ02aexhWcSb7niSooUesPGG+oFmC3nLF8oiqqX169XH7eTNwaXhIALXKd5c+SK9piy7scLBhDfdwzuG9ZrNwpKyIPy6+1/o3W17o5TCkpBEFivqKCSc5IMNSnEVI9M1wp2eQSS5mhT7JMXlsx/pjQfzQuC5ErKvKG2T3Mpg3/An4DXU1cLdPLmrEAAAAASUVORK5CYII=',
            "postback": {
              "title": "Transactions",
              "value": "get transactions"
            }
    
        }, {
            "title": "Transfer Money",
            "icon":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAAC+ElEQVQ4EbVU30uTURg+52zqTPSmsptMiSCxusjIiMTAqH+gGIihM2+2WUi6LSikLqJkP5SUuRXO/SgTggK7Me8sCErqIhESgpCILmrYL1O39n1vz5l+43Ot6U0f2973vM/zPuf93nPecZbj8fnHKhSWCHNODUSsIAeFcca/EWMhp73VyUHM5hizA3KtsJUQzAmIMiQ9J0af9DzI1CFWiVi3LxCbgx3W49Ln+sDAyIPticSva4y4jYhQFPteXGSqudDetE7YHQhbmMrCa7lfuGBXKreWjJjNZkXTSwuHw2FTfFl0MqLLqKRMgrJSU1GRWRN1+yMuLmjaaWubkrh3KHJIJXolffmAP8u5cDhsLZNyLbzBSFN8ic0Rqb1Yf2aCn5GAfH1NVK5R/WlSeV3ax4/DbnmdDnM+AdXr4O9WVeWJZygy2Xcnsk+oCt1HKyuxY6zMuL/GZbM81JL11mW3HHF1WNz6mPQhuAisx0CmamwwjxaeSqXoqtCICJz9oczekG3RYpu1fcN39yh8ZRStrNJy0sJo9EvsNg1xR3yJv9HATVniR5WEMoOTrsd3QMtJC+P8PzhtrceE4A4AFRLEldrlicVKpO/13zuM3vV7hqKXPIFYeTp2O1wtLZqxkzh95AbR4OywdK7GGMvcY/RYRdB3Kzj6OKn8HkHv6tmiMuMJRPtJTbnxNsWyo/iYPf7II0pRD/jI4f3GbVt6uszmZU1U2oywFuy0Nr+DyHFvMHoe9iap6qCGrdlabFqL1r01MDrXbbe8yMLTy8zh6UFZvdNmGShghQfgT2VhimCi11RVfrDb3pZTVPL/qlgvctHe/B5VN3qCUSsa5cZdnjcI0dZlbckMhp6v9/MKSyIqRmNZYDA0Nr6j1BDH2Cb1Av/yNxTWEtdNoRbMY3P2OA9/09B/FOY8yYmXbrqUPMRQaHxVh3jSiHF+htM+iUs/gQn6mSdvQ2gh8XWvJOHv9amx0CDaEyllGMffiKkq3DA7H4HTAmR9Dmtr6A89ZycAT8OdlwAAAABJRU5ErkJggg==',
            "postback": {
              "title": "Transfer Money",
              "value": "transferfunds"
            }
        }, {
            "title": "Bill Pay",
            "icon":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAE6ADAAQAAAABAAAAFgAAAADoj9/WAAABvklEQVQ4Ea1VsU7DQAy1k7ZQhnZCLJUQA0v5AfgCRiY6BUSQEKVAB0BdoSt0AoFADAHUqf0CvgCQYEw3BgQLIIZGSA2kifFFDLmIVC3KDZHv/O75ne3c4dlZI2u5nSMgmiOgDAw0sItAD6qqbmwVF+/x4OTyishbAMAPRHodiIswzQImEPFtKJOYTAhFgmh0hHK6rtsDkTG4dnxheERLdrs7rYijCUX/IRKBef+TLwApq/hGTJ9EkKd2Ws+T6xSCa1E2IZiVkt4M+iUyz3Om2LkbBPSwBVE02XAyeWM7/SlTAZ7DgSRl5RXtJRwtvKHXPNYCxEomHXP/xJjnxmlEHaWyrqOouOc6JiA0uZpS5SUyBVWLwG1FkYl1D7tfiNAiQpFfaUhkO2uL1+wV7RE5KqtLj+z8EyORHZ7Xc9waM1FMokkP6/WMbTmzojW2S/ptECuR+UQ9csYb8fsTciKvLueM5z1ypiRN/p2qwWhhO5VKvX91nCoBmGGfpGynqInk74VBwXl5ufAehYm1zxQEtLjMY4ZhDAcV9Gvz/nEfS9iO99rOqOlNflD4yuQHhSDfr6JfHD8ocKcqykZZ06wfEEOwemip5dUAAAAASUVORK5CYII=',
            "postback": {
              "title": "Bill Pay",
              "value": "paybill"
            }
        },{
            "title": "P2P Payment",
            "icon":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAARCAYAAADKZhx3AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHqADAAQAAAABAAAAEQAAAABIEaDUAAAD2ElEQVRIDbVUXWxURRQ+Z/Yu23aF8lcTlL8oPFgqMRYkEWyMqZGkT6hpKErLDcRNSyBZdAsPmPDAE63doGnrEshui9pkQyQRSkIkxkAUA5gYreVBIJKGn1hEKmx/3L07fufuDr299qEvTnIzZ8453/fdOTNnmKYZyWSy5N4476c81WnWz7KmQU18YnlFWby+vt6ZBkLpdDrw+/BolEm/rZkqWfN1UtS/sEQftG173I9hvyOeTM7NjvH3pPVzEmOm+1rTfNcmPj/HqqqNRNZkvbhE4krw79zAOU26xo8BwdVgqX45atsPvBjlXYidG+PDrijzaSqjRbEWe4EVslaC4AchHnEG9vsx4nNFkSO5ghEsMKeFy+X0gaYIf3zmTIhINzDxXX5CbW617buSv2fH1mulodBbKM8ESmn7OEh8EpMcyZW4YIVDuISzwD2JnCLsDP25CmUNInwx1tiYmUwj2rW94TZ2MIj4ko6jabf0EhdbfBJzczygIsdF4czeHK70hHD83uGowjkwLfW6xdZaK3yLmdlZPIcembjY4pOY5Bi/mXEEy8RW2hoxPnftXURb3rmB6/QrCKrbu3qavLH2T3s/xLoCsbO42f+YmNjik1gxx4SoyPGicBa4H4fImjQLFiu1W+fzZ/M6n2rrTG0m1oMAroNvPc7rEQesmB9jBbnVyVINcg4AUwvMJdJcCY6NwOaE04/5TztJQltXqg7FPVk87wKG6aHFqnZPc9MlP4msO7p7Xsrp/DnSNNvE0YpoO94Ua9nWb3xmniLc1tsb5kz+PZQu6l4Yk1WcseNrzPqj2YHnj5lelh5+6PyyXWt+H+e5wgfBnaMh3IG4Dqsj3gv7WLitu/dJQokBfgECGfTISbTJd3iFHmAXS0D4Cn4GlXAv5NfhivCbIpIZznyJ6XV8eYjIzi4AO4TXbi5eu/XAbgJnGJw/kVJvxJob/0AOUjA+Odb31NjE+LdIWomE8xYHbf9lkLyOo8dX5CacPhzDGohcFh9+Zi1orlihQIPpYfGbEe/6/JmcziYhXgO130pDJa9K27nChzpTX4CiASX57IPmpkbM2gD9s/uOj1E/BF+TGH7gm4WlVDfde2ywODrV3t3Tg/ldIPpad27bwu1dqWqoXAbRrXKrrCoSqZ/SbwbsneOJ44tyjvOz+KxAYHU0svWONz6dnUiky0dyowP40aex27UKorvxJ9ik2jsTUSEVIeAOyDcTUcEIt1K0T7RE00LtN0hp54fKT0nCTEd5oOrITHNN3rxZ8766P/EXigtNNPxVGKOtO+1qk/B/zoc6kz/iApf9C2r8rcPrzxa2AAAAAElFTkSuQmCC',
            "postback": {
              "title": "P2P Payment",
              "value": "p2ppayment"
            }
        },  {
            "title": "Pay Credit Card",
            "icon":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAFAAAAABUzb9jAAADD0lEQVRIDaVVX0iTURQ/537f5vq3IIXqyQiSRPTFoh6E7MEeyh76t7KJ00rnwtRqEdlbPUTbNAzcNAN1mNEIAgmKouwpepEosKggTFKKHKLh0H3t3s43nbr2uX2zy9i955zfOb97zz3nfghJxsDAgDz4caRFCGETIMxJoMlMnIxDyKD+kqPqFWoho0SfRnM4V6wgoAkAg4gwqoVNrRMy+edSnEmzvHpLAqHb23NZAL9KgHWxYBmSMaeh1volJqc7u7zdHSBEjYxS8QJhWyCwNjQe6qb0HQHECSJ8SqcqJnkzyXUMxVS6RDE853CC1vuZJO+LEra239s2G1EeAYg8RHwvg+HQ+bPWr662rmcELIk5/u+sEsrNvp7SWR7upWDrKdf3zVLmGbv9YCguOOI1OvHvOF06AopS8t+jushciH4E5FRFTqejslkrjtFg9DZWn/ypZdOjc3u7N1KVzxGSQxCQHXc6Kl7qcVYxt9r8uQpGyuk+tpP4JjtrTavFYgnr8ZeNEitssFeMpAK3BAKreHD6qOBYo0CkiFKk/tRxeHh8eifNlqiU4o/pIVOUsCvyKzRG1ean1BRRYQ0iY7XIpHy6js/EfMzT0ZeVgitqpqZMHNEWCU6XAcd8IqAWEhUUeIqIfAyx86LD9lb1ut3ba56d5Exdm0zK/IFVafmhSRiamMkTHO6oSaNefC0QOs0sM7C0et0d/l0zU0ofhd4KCA/qbLbg8jSLloXGX1TNraiyrkgy9F+oqRxKtHU1ks4lBBhoQx+AsSYEFt9KMSfOZcrRdcpSoSwbCpYljOGXzuTEPF5/Oz191Uv1etZ0HU+cDtsBzZRqBSAy9Ph67tJuqyjPw7TTh1q4f3WUAU7FNrQjN7uPSNWXXN/w+Pw3ibRKrUpTRsbec6fLxvR5xqN0EdJ9uoXgTtrhKPVtyUrJVOqkhM3ert0c8AadTP2sfDMyQ0mD3ZrykYg/U7yEtPt38SpViqZ6E1Xhhnnbc5PRcKq+uvx7IjY9jUy7L0h0wT+k+wEoXkjI/NTojxMxK9P8BSw3HzFHoyMpAAAAAElFTkSuQmCC',
            "postback": {
              "title": "Pay Credit Card",
              "value": "pay credit card"
            }
        }, {
            "title": "Find a Branch/ATM",
            "icon":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFgAAAABPu2jeAAADDUlEQVQ4EZ1VT0iUURCfed/+AUuESA8KuQeFrKBL2im62KHAbnpIWlfacNulQ9uuRGCHLpHKGoKrhbGbHqIuQYRRVJCXiLoVdNBDdehQEF2ydPd7r9986y7ft6smzuGb934z83sz+2be8vjt3H5tc46JOo0xFu1QmPk7kbmRjg/e4tFs/g0bOgDgPrNa2yEnaTJHyZguRf4un2QIwtl0YjC2U0KJy9zJHywW6COR3emTktV6hqNT+RfM9Dkdj0THsvlZMnR8s4M46O+mYqHV2HSXLTpHyvpGVCTN2vK5g4SQDMPoSLNh08zEr90+hiiEMjss0n4itWKzXlLQbh8PqWToNjIOSCcip9zYaDZ3EftJwZKx8Hsox56ZnW8TTMRDWipZiAaulcxbfzMzc0dsra9bSon/r7K3h9QYCjFaYbuiSdfhd28XrcjamHQ4EeneLqH4pWKRRah2WW9e/nRuBIn+SMUHZ8QRF9U4nr3n/H6yF0G3HDZIT2Riaq7DZnPBMjwNpOCA+HjKRz+EDdMScIcUsQ0oTS5mQwFhSBvYWT1VxBLniIcUN+2UIhZ0gufWS+4132UgmJ8tykfzh4lNQ03ofwAVCDwmDGpZPJniyBF0QFvZuG29VlymgKqUr9yBMnqYoKhgon1BXzum7FnFh/mvZXG3gxN9gc+irOutPZ6p85Cmov1f8IQ5Yyo6GT27bAV2ncEREyB4qJR1+nIs8lJwYAWc/FvWQ0M9VWPKvIY+qa9kU7VIRvt+AkpWwTVbU9AOhzyfPvTlK/Rj/1g2tw+nr2pjGqsjMtn5YzbZJ9ERV6tsnRjtBcHQWocQX/RpXlT+QCCCzQM0b4uMHNq72XEivVu0CF6ivWj4ygVOLiwE4ecH5oxpKY6/Kja9lxLhT06PlUJL3/GZ+RPaLj6XHUq5ko4P3HTbJ6ZzoaLht5isJjg8GY5Hetx2WXtaSgAdLH7gFVpF5pJNCmPaInhZCtrIX0+T7HHL78q4W9dkKka8mb34rcdA3Op2rqyZVvAwPPI11p1P9vX9qeDri386xR8UkJ032QAAAABJRU5ErkJggg==',
            "postback": {
              "title": "Find a Branch/ATM",
              "value": "find atm"
            }
        }, {
            "title": "Freeze Card",
            "icon":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAACoklEQVQ4Ea2UT0hUYRDAZ7731E1DiYSORlHgwUtESES4lFanQmgJM93FAneF/rlrp/BQB9u10nLXFoS3K3loIQxCL4F0yFPiKYpO5TFdUxa1Vd/7pvm2Hsjmn6f5wWPe976Z3zczb2YwHE00IUJNRXnxDY/HY8EuLSEAK4nINzWz+NowDNcucQEVKBJL3iOSXYj4vqhUv3izsTHzvxfg09jQIRNWYgB4lj3XGDjp2lNyflnPLsGCfEUAJ51egkQZQkx2BLydGIklPgBBFfv+BgmkRGhg+b1QF7Uu2JfOWOkHBFjqEH4YiNxCE5d1NqjmJxoKeG8pY07LEAANL5tyXMJcXajN166+O1nx+ERBxvr0S1pUjeGowQ7hHHs5YxsT0gGOoozTMytAvxBsa/wYiRm3gdBv62wkCegoCOhVHgNDZ9nLL7Yy7/+8I5wgMscev0hcam/19oT7DRfKXIS26j+SC+AIwyEHZo+HORUd+VrdA0MVcmXlnbRgpDs62BD0N3Xl6+Tvw7HEsvom8g/W7oPXr04haqf44s+EMhWJJlrWnm/2vilYGYb8TdNc2zUc3TiHOMC5Dm0GtM+2BCtF1TDlxXSOW/8tEYS7+xOPbMBG0hFYGft8vuzxyoP1/HMGpaQOrv+BVCqlGmrd5RisrN1utxn0N3sZ3sNd2jKVXkw9Gx0tWo+8LbACMJS4gu4IxPuclvrst+mRaCq1Nx++bbANCAa8D0FggOvfvZReHOtLJvf/PZtUkmeFwc2BE4DiWglpq7ahU7mAq1dAUh+H8tVVoNdpZYXz2Z/Z0zqX0XMuo04g68cC7GDO8/jLLaLK7Ko5rs1bte2tzaP2PFYj8xgI2nFqBKEuAe7ydDN1veBMDuw07K30nsRfVpmW2Su0Qs9vnFEJEwmbANQAAAAASUVORK5CYII=',
            "postback": {
              "title": "Freeze Card",
              "value": "freeze card"
            }
        }] 
        ,
        "heading": "How may i help you?"
    }
    return actionsData;
}
KorePickers.prototype.showRadioOptionMenuItems=function(accountData){
   accountData={
       "radioOptions":[
           {
               "title":"Shanmuga",
               "value":"1234 4567 5678 6789",
               "postback": {
                   "title": "Transaction Successful",
                   "value": "Payment Successful"
                 }
           },
           {
               "title":"Madhu",
               "value":"1234 4567 5678 9876",
               "postback": {
                   "title": "radioOptionDetails",
                   "value": "AccountData"
                 }
           },
           {
               "title":"Santhosh",
               "value":"4678 1234 5678 9876",
               "postback": {
                   "title": "Get my leave balance",
                   "value": "leaveintent"
                 }
           },
           {
               "title":"Manjula",
               "value":"9876 1234 4567 5678",
               "postback": {
                   "title": "Transaction Successful",
                   "value": "leaveintent"
                 }
           },
           {
               "title":"Ravi Kiran",
               "value":"8976 5677 7946 2345",
               "postback": {
                   "title": "radioOptionDetails",
                   "value": "leaveintent"
                 }
           },
       ]
   }
   return accountData;
}
KorePickers.prototype.init = function (mainConfig) {
    mainConfig=this.mainConfig;
    chatWindowInstance=this.chatWindowInstance;
    if (chatWindowInstance.config.pickersConfig.showDateRangePickerIcon) {
       this.showDateRangeIconToFooter();
    //    KorePickers.prototype.showDateRangePicker(mainConfig);
       chatWindowInstance.config.chatContainer.on('click', '.sdkRangeCalender.calenderBtn', function (event) {
       KorePickers.prototype.showDateRangePicker(mainConfig);
        });
    }
    if (chatWindowInstance.config.pickersConfig.showDatePickerIcon) {
        this.showDateIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkCalender.calenderBtn', function (event) {
        KorePickers.prototype.showDatePicker(mainConfig);
         });
     }
     if (chatWindowInstance.config.pickersConfig.showClockPickerIcon) {
        this.showClockIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkClock.clockBtn', function (event) {
        KorePickers.prototype.showClockPicker(mainConfig);
         });
     }
     if (chatWindowInstance.config.pickersConfig.showradioOptionMenuPickerIcon) {
        this.showAccountIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkAccount.accountBtn', function (event) {
        KorePickers.prototype.showradioOptionsPicker(mainConfig);
         });
     }
     if (chatWindowInstance.config.pickersConfig.showTaskMenuPickerIcon) {
        this.addTaskIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkMenu.menuBtn', function (event) {
        KorePickers.prototype.showTaskPicker(mainConfig);
         });
     }
}
KorePickers.prototype.addSlider = function(){
    $('.kore-chat-window').remove('.kore-action-sheet');
    var actionSheetTemplate='<div class="kore-action-sheet hide">\
    <div class="actionSheetContainer"></div>\
    </div>';
    $('.kore-chat-window').append(actionSheetTemplate);
}
KorePickers.prototype.bottomSlider = function(action, appendElement){
    $(".kore-action-sheet").animate({ height: 'toggle' });
    if(action=='hide'){
    $(".kore-action-sheet").innerHTML='';
    $(".kore-action-sheet").addClass("hide");
    } else {
    $(".kore-action-sheet").removeClass("hide");
    $(".kore-action-sheet .actionSheetContainer").empty();
    setTimeout(function(){
    $(".kore-action-sheet .actionSheetContainer").append(appendElement);
    },200);
    
    }
}
/* RadioOption Template start */
KorePickers.prototype.showradioOptionsPicker = function (mainConfig) {
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".radioOptionsPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    accountData=this.showRadioOptionMenuItems();
    _korePickers.find(".kore-action-sheet").append(this.getradioOptionsPickerContainer());
    this.addAccountIconToFooter();
    _korePickers.find(".radioOptionsPickerContainer").append(this.getradioOptionsPickerTemplate(accountData));
    this.addradioOptionsMenuListener(mainConfig);
}
KorePickers.prototype.getradioOptionsPickerTemplate = function (radioOptionConfig) {
    var $radioOptionsContent = $('<div class="radioOptionMenuPicker"></div>');
    var radioOptions = radioOptionConfig.radioOptions;
    radioOptions.forEach(function (radioOption) {
    var radioOptionHtml = $('<label class="radioButton">\<div class="btnAccount">\
      <div class="radioValue">\
         <input type="radio" id="selectedValue" name="radio">\
         <span class="checkmark"></span>\
         </div>\
         <span class="radioOptionDetails">\
            <span class="radioOptionName" title="'+ radioOption.title + '" data-value="' + radioOption.postback.value + '" data-title="' + radioOption.postback.title + '">' + radioOption.title + '</span>\
            <div class="radioOptionValue" title="'+ radioOption.value + '">' + radioOption.value + '</div>\
         </span>\
    </div> </label>');
        $radioOptionsContent.append(radioOptionHtml)
    });
    return $radioOptionsContent;
}
KorePickers.prototype.addradioOptionsMenuListener = function (mainConfig) {
    var _self = this;
    var target;
    _korePickers.find(".radioOptionsPickerContainer").removeClass("hide");
    _korePickers.find(".TaskPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".clockPickerContainer").addClass("hide");
    // _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find(".kore-action-sheet  .datePickerContainer").addClass("hide");
    _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
        "display": "none"
    });
    _self.bottomSlider('show', _korePickers.find(".radioOptionsPickerContainer"));
    setTimeout(function () {
        _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
            "display": "block"
        });
    }, 300);
    _korePickers.find(".btnAccount").click(function (event) {
        target = $(event.currentTarget);
        target.find(".checkmark").addClass("selected");
    });
    _korePickers.find(".radioOptionsPickerContainer .confirmBTN").click(function (event) {
        var radioOptionPostbackMsg = target.find('.radioOptionName').attr('data-value');
        var radioOptionTitle = target.find('.radioOptionName').attr('data-title');
        mainConfig[0].chatWindowInstance.sendMessage($('.chatInputBox').text(radioOptionPostbackMsg), radioOptionTitle);
        _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({ "display": "block" });
        _self.bottomSlider('hide');
        _korePickers.find(".kore-action-sheet").remove();
    });
    _korePickers.find(".radioOptionsPickerContainer .closePicker").click(function () {
        _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
            "display": "none"
        });
        _self.bottomSlider('hide');
        setTimeout(function () {
            _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
                "display": "block"
            });
        }, 100);
        _korePickers.find(".kore-action-sheet").remove();
    });
}
KorePickers.prototype.getAccountIconTemplate = function () {
    var AccountFooterTemplate = '<div class="sdkFooterIcon account"> \
    <button type="button"  class="sdkAccount accountBtn" title="AccountMenu"> \
         <i class="accountIcon"></i> \
    </button> \
    </div>';
    return AccountFooterTemplate;
}
KorePickers.prototype.addAccountIconToFooter = function () {
    _korePickers.find(".radioOptionsPickerContainer").append(this.getAccountIconTemplate);
}
KorePickers.prototype.getradioOptionsPickerContainer = function () {
    return '<div class="radioOptionsPickerContainer hide">\
    <div class="radioOptionMenuHeader">\
       <button class="closePicker" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
       <label class="radioOptionHeading">Select an Account</label>\
    </div>\
    <div class="confirmBTN">Confirm</div>\
    </div>'
}
KorePickers.prototype.showAccountIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getAccountIconTemplate);
}
/*RadioOption Template end*/ 

/*TaskMenu Template start*/
KorePickers.prototype.showTaskPicker = function (mainConfig) {
actionsData=this.showTaskMenuItems();
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".TaskPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getTaskPickerContainer());
    _korePickers.find(".TaskPickerContainer").append(this.getTaskPickerTemplate(actionsData));
    this.addTaskMenuListener(mainConfig);
}
KorePickers.prototype.getTaskPickerTemplate = function (taskPickerConfig) {
    var $taskContent = $('<div class="taskMenuPicker"></div>');
    var tasks = taskPickerConfig.tasks;
    tasks.forEach(function (task) {
    var taskHtml = $('<div class="btnTask">\
        <span class="taskName" data-value="'+ task.postback.value + '" data-title="' + task.postback.title + '" title="' + task.title + '">' + task.title + '</span>\
        <div class="imageIcon"> <img src="'+ task.icon + '" class="displayIcon"></div>\
        </div>');
        $taskContent.append(taskHtml)
    });
return $taskContent;
}
KorePickers.prototype.addTaskMenuListener = function (mainConfig) {
    var _self = this;
    _korePickers.find(".TaskPickerContainer .searchInput").hide();
    _korePickers.find(".TaskPickerContainer").removeClass("hide");
    _korePickers.find(".radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".clockPickerContainer").addClass("hide");
    // _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find(".kore-action-sheet  .datePickerContainer").addClass("hide");
    _self.bottomSlider('show', _korePickers.find(".TaskPickerContainer"));
    _korePickers.find(".TaskPickerContainer .btnTask").click(function (e) {
        var inputValue = $(e.currentTarget).find(".taskName").text();
        _korePickers.find('.footerContainer.pos-relative .chatInputBox').text(inputValue);
        var taskPostbackMsg = $(e.currentTarget).find('.taskName').attr('data-value');
        var taskTitle = $(e.currentTarget).find('.taskName').attr('data-title');
        mainConfig[0].chatWindowInstance.sendMessage($('.chatInputBox').text(taskPostbackMsg), taskTitle);
        _self.bottomSlider('hide');
        _korePickers.find(".kore-action-sheet").remove();
    });
    _korePickers.find(".TaskPickerContainer .closeSheet").click(function () {
        _self.bottomSlider('hide');
        _korePickers.find(".kore-action-sheet").remove();
    });
}
KorePickers.prototype.getTaskIconTemplate = function () {
    var TaskFooterTemplate = '<div class="sdkFooterIcon menu"> \
    <button type="button"  class="sdkMenu menuBtn" title="TaskMenu"> \
         <i class="menuIcon"></i> \
    </button> \
    </div>';
    return TaskFooterTemplate;
}
KorePickers.prototype.addTaskIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getTaskIconTemplate);
}
KorePickers.prototype.getTaskPickerContainer = function () {
    return '<div class="TaskPickerContainer hide">\
    <div class="taskMenuHeader">\
         <button class="closeSheet" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
         <input class="searchInput" placeholder="Write a reply">\
       <label class="taskHeading">  How may I help you?</label>\
    </div>'
}
/*TaskMenu Template end*/

/*DateRangePicker start*/
KorePickers.prototype.showDateRangePicker = function (mainConfig) {
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".kore-action-sheet .dateRangePickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getdateRangePickerContainer);
    this.addDateRangeIconToFooter();
    var defaultlibConfig = {
        alwaysOpen: true,
        singleMonth: true,
        showShortcuts: false,
        showTopbar: false,
        format: mainConfig[1].dateRangeConfig.format,
        startDate: mainConfig[1].dateRangeConfig.startDate,
        endDate: mainConfig[1].dateRangeConfig.endDate,
        inline: true,
        container:  _korePickers.find('.kore-action-sheet .dateRangePickerContainer'),
    };
    $.extend(defaultlibConfig, mainConfig[1].dateRangeConfig)
    daterangeInput =  _korePickers.find('.kore-action-sheet .dateRangePickerContainer #rangeCalenderBtn').dateRangePicker(defaultlibConfig)
    this.addDateRangeListener(mainConfig);
}
KorePickers.prototype.addDateRangeListener = function (mainConfig) {
    var _self = this;
    this.addClickEventRangeCalender(mainConfig);
    var startdateValue;
    var enddateValue;
    var showStartDateValue = null;
    var showEndDateValue = null;
    var showStartYearValue = null;
    var showEndYearValue = null;
    daterangeInput.bind('datepicker-first-date-selected', function (event, obj) {
        $(".day.toMonth.valid").removeClass("selectedDefault");
        var startYear = null;
        startdateValue = obj.date1;
        var startYear = moment(startdateValue).format("YYYY");
        var startDate = moment(startdateValue).format("ddd,MMM DD");
        showStartYearValue =  _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showStartdate .showStartYear').html(startYear);
        showStartDateValue = _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showStartdate .showStartMonth").html(startDate);
        _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html("Select");
        _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').css({ "opacity": "0" });
    })
    daterangeInput.bind('datepicker-change', function (event, obj) {    
        var endYear = null;
        _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').css({ "opacity": "1" });
        enddateValue = obj.date2;
        var endYear = moment(enddateValue).format("YYYY");
        showEndYearValue =  _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').html(endYear);
        var endDate = moment(enddateValue).format("ddd,MMM DD");
        showEndDateValue = _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html(endDate);
    })
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .confirmBTN").click(function () {
        if ((showStartDateValue !== null) && (showEndDateValue == null)) {
            _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html("Select");
        }
        else if ((showStartDateValue !== null) && (showEndDateValue !== null)) {
            var startViewDate = moment(startdateValue).format('MM-DD-YYYY') || moment();
            var endViewDate = moment(enddateValue).format('MM-DD-YYYY') || moment();
            var _innerText = startViewDate + ' to ' + endViewDate;
            _korePickers.find('.footerContainer.pos-relative .chatInputBox').text(_innerText);
            var e = $.Event("keydown");
            e.keyCode = 13;
            _korePickers.find(".footerContainer.pos-relative .chatInputBox").trigger(e);
            _self.bottomSlider('hide');
            daterangeInput.data('dateRangePicker').clear();
            daterangeInput.data('dateRangePicker').resetMonthsView();
            _korePickers.find(".kore-action-sheet").remove();
        }
    })
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .close-button").click(function () {
        _self.bottomSlider("hide");
        _korePickers.find(".kore-action-sheet").remove();
    })
}
KorePickers.prototype.addClickEventRangeCalender = function (mainConfig) {
    var _self = this;  
    _korePickers.find('.kore-action-sheet .datePickerContainer').addClass("hide");
    _korePickers.find(".kore-action-sheet .clockPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .TaskPickerContainer").addClass("hide");
    // _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer #rangeCalenderBtn').data('dateRangePicker').open();
    _korePickers.find(".cancelBtn").hide();
    _korePickers.find(".drp-selected").hide();
    //  dateRangePicker.prototype.outsideClick = function (e) { }
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showStartdate .showStartMonth").html(moment().format('ddd,MMM DD'));
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html(moment().format('ddd,MMM DD'));
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showStartdate .showStartYear').html(new Date().getFullYear());
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').html(new Date().getFullYear());
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").removeClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .date-picker-wrapper").css({ "border": "0px", "background-color": "white" });
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .month-wrapper").css({ "border": "0px" });
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .headerCalendar .choose").html(mainConfig[1].daterangepicker.title);
    _self.bottomSlider('show', _korePickers.find(".dateRangePickerContainer"));
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .confirmBTN").css({
        "display": "block"
    });
}
KorePickers.prototype.getDateRangeIconTemplate = function () {
    var dateRangeFooterTemplate = '<div class="sdkFooterIcon rangeCalender"> \
                    <button name="dates" class="sdkRangeCalender calenderBtn" title="RangeCalender"> \
                        <i class="Rangecalender"></i> \
                    </button> \
                </div>';
    return dateRangeFooterTemplate;
}
KorePickers.prototype.addDateRangeIconTemplate = function () {
    var footerRangeIcon = '<div id="rangeCalenderBtn">\
    </div>'
    return footerRangeIcon;
}
KorePickers.prototype.showDateRangeIconToFooter = function () {
    _korePickers=this._korePickers;
   _korePickers.find(".footerContainer").append(this.getDateRangeIconTemplate);
}
KorePickers.prototype.addDateRangeIconToFooter = function () {
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").append(this.addDateRangeIconTemplate);
}
KorePickers.prototype.getdateRangePickerContainer = function () {
    return '<div class="dateRangePickerContainer hide">\
                <div class="headerCalendar">\
                    <span class="choose"></span>\
                    <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                </div>\
                <div class="showDatevalues">\
                    <div class="showStartdate">\
                        <div class="showStartYear"></div>\
                        <div class="showStartMonth"></div>\
                    </div>\
                    <div class="showEnddate">\
                        <div class="showEndYear"></div>\
                        <div class="showEndMonth"></div>\
                   </div>\
                </div>\
               <div class="confirmBTN">Confirm</div>\
           </div>';

}
/*DateRangePicker end*/  

/*DatePicker start*/  
KorePickers.prototype.showDatePicker = function (mainConfig) {
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".kore-action-sheet  .datePickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getdatePickerContainer);
    this.addDateIconToFooter();
    var defaultlibConfig = {
        alwaysOpen: true,
        singleMonth: true,
        showShortcuts: false,
        singleDate: true,
        showTopbar: false,
        format: mainConfig[1].dateRangeConfig.format,
        startDate: mainConfig[1].dateRangeConfig.startDate,
        endDate: mainConfig[1].dateRangeConfig.endDate,
        inline: true,
        container:  _korePickers.find('.kore-action-sheet .datePickerContainer'),

    };
    $.extend(defaultlibConfig, mainConfig[1].dateConfig)
    daterangeInput =  _korePickers.find('.kore-action-sheet .datePickerContainer #calender').dateRangePicker(defaultlibConfig)
    this.addDateListener(mainConfig);
}
KorePickers.prototype.addDateListener = function (mainConfig) {
    var _self = this;
    this.addClickEventCalender(mainConfig);
    var startdateValue;
    // var enddateValue;
    // var showStartDateValue=null;
    // var showEndDateValue=null;
    // var showStartYearValue=null;
    // var showEndYearValue=null;
    daterangeInput.bind('datepicker-first-date-selected', function (event, obj) {
        $(".day.toMonth.valid").removeClass("selectedDefault");
        var startYear = null;
        startdateValue = obj.date1;
        var startYear = moment(startdateValue).format("YYYY");

        var startDate = moment(startdateValue).format("ddd,MMM DD");
        showStartYearValue =  _korePickers.find('.kore-action-sheet .datePickerContainer .showStartdate .showStartYear').html(startYear);
        showStartDateValue = _korePickers.find(".kore-action-sheet .datePickerContainer .showStartdate .showStartMonth").html(startDate);
    })
    _korePickers.find(".kore-action-sheet .datePickerContainer .confirmBTN").click(function () {
        var startViewDate = moment(startdateValue).format('MMMM Do, YYYY') || moment();
        var _innerText = startViewDate;
        _korePickers.find(".footerContainer.pos-relative .chatInputBox").text(_innerText);
        var e = $.Event("keydown");
        e.keyCode = 13;
        _korePickers.find(".footerContainer.pos-relative .chatInputBox").trigger(e);
        _self.bottomSlider('hide');
        daterangeInput.data('dateRangePicker').clear();
        daterangeInput.data('dateRangePicker').resetMonthsView();
        _korePickers.find(".kore-action-sheet").remove();
    })
    _korePickers.find(".kore-action-sheet .datePickerContainer .close-button").click(function () {
        _self.bottomSlider("hide");
        _korePickers.find(".kore-action-sheet").remove();
    })
}
KorePickers.prototype.dateHighlights=function(){
    var datePickerHighlight='<div class="datePickerHighlights">\
    <div class="paymentMain">\
         <span class="paymentIcon"></span>\
         <span class="paymentDue"></span>\
    </div>\
    </div>';
    return datePickerHighlight;
    }
KorePickers.prototype.addClickEventCalender = function (mainConfig) {
    var _self = this;
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .clockPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .TaskPickerContainer").addClass("hide");
    // _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find('#calender').data('dateRangePicker').open();
    if(mainConfig[1].dateConfig.showdueDate){
        $(".kore-chat-window .kore-action-sheet").css({"height":"485px"});
        $(".datePickerContainer").append(this.dateHighlights);
    }
    $(".selectedMain").insertAfter(".date-picker-wrapper.single-date");
    $(".datePickerHighlights").insertAfter(".date-picker-wrapper.single-date");
    if(mainConfig[1].dateConfig.startDate){
        // $(".day.toMonth.valid.real-today").first().css({"background-color":"rgb(97, 104, 231)"})
        $(".day.toMonth.valid").first().addClass("selectedDefault");
        $(".day.toMonth.invalid.real-today").css({"background-color":"#FFFFFF"});
        }
    hlght(mainConfig[1]);
    $(".month-wrapper .next").click(function(){
        hlght(mainConfig[1]);
    })
    var startDate=moment().format('MM-DD-YYYY');
    _korePickers.find(".cancelBtn").hide();
    _korePickers.find(".drp-selected").hide();
    //  dateRangePicker.prototype.outsideClick = function (e) { }
    _korePickers.find(".kore-action-sheet .datePickerContainer  .showStartdate .showStartMonth").html(moment().format('ddd,MMM DD'));
    _korePickers.find('.kore-action-sheet .datePickerContainer .showStartdate .showStartYear').html(new Date().getFullYear());
    _korePickers.find(".kore-action-sheet  .datePickerContainer").removeClass("hide");
    _korePickers.find(".kore-action-sheet  .datePickerContainer .date-picker-wrapper").css({ "border": "0px", "background-color": "white" });
    _korePickers.find(".kore-action-sheet  .datePickerContainer .month-wrapper").css({ "border": "0px" });
    _korePickers.find(".kore-action-sheet .datePickerContainer  .headerCalendar .choose").html(mainConfig[1].datepicker.title);
    $(".datePickerContainer .selectedDate").html(mainConfig[1].dateConfig.selectedDate);
    $(".datePickerContainer .datePickerHighlights .paymentDue").html(mainConfig[1].dateConfig.paymentDue);
    _korePickers.find(".kore-action-sheet .datePickerContainer  .confirmBTN").css({
        "display": "none"
    });
    _self.bottomSlider('show', _korePickers.find(".datePickerContainer"));
    setTimeout(function () {
        _korePickers.find(".kore-action-sheet .datePickerContainer  .confirmBTN").css({
            "display": "block"
        });
    }, 300);
}
KorePickers.prototype.getDateIconTemplate = function () {
    var dateFooterTemplate = '<div class="sdkFooterIcon singleCalender"> \
                    <button name="dates" class="sdkCalender calenderBtn" title="Calender"> \
                        <i class="calender"></i> \
                    </button> \
                </div>';
    return dateFooterTemplate;
}
KorePickers.prototype.addDateIconTemplate = function () {
    var footerIcon = '<div id="calender">\
    </div>'
    return footerIcon;
}
KorePickers.prototype.showDateIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getDateIconTemplate);
}
KorePickers.prototype.addDateIconToFooter = function () {
     _korePickers.find(".kore-action-sheet  .datePickerContainer").append(this.addDateIconTemplate);
}
KorePickers.prototype.getdatePickerContainer = function () {
    return '<div class="datePickerContainer hide">\
                <div class="headerCalendar">\
                    <span class="choose"></span>\
                    <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                </div>\
                <div class="showDatevalues">\
                    <div class="showStartdate">\
                        <div class="showStartYear"></div>\
                        <div class="showStartMonth"></div>\
                    </div>\
                    <div class="showEnddate">\
                        <div class="showEndYear"></div>\
                        <div class="showEndMonth"></div>\
                   </div>\
                </div>\
               <div class="confirmBTN">Confirm</div>\
               <div class="selectedMain">\
                    <span class="selectedIcon"></span>\
                    <span class="selectedDate"></span>\
                </div>\
           </div>';

}
/*DatePicker end*/  

function getMonth(date){
    var month =new Date(date).getMonth();
    return month;
  }

function hlght(config){
    var monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      var currentmonth = $(".date-picker-wrapper .month-wrapper .month1 .month-name .month-element")[0].innerText;
    //   var endMonthFormat=moment(endMonth).format("MM");
      var endMonth = getMonth(config.dateConfig.endDate);
      if(config.dateConfig.showdueDate && (monthList[endMonth].toLowerCase() === currentmonth.toLowerCase())){
        $(".month-wrapper .day.toMonth.valid").last().css({"background-color":"#e94848"});
        $(".month-wrapper .day.toMonth.valid.tmp").last().css({"background-color":"#e94848"});
    }
  }
 
/*ClockPicker start*/ 
KorePickers.prototype.showClockPicker = function (mainConfig,e) {
    if (_korePickers.find(".clockPickerContainer").length) {
        _korePickers.find(".clockPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
       
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getclockPickerContainer);
    this.addClockIconToFooter();
    var input = $('#clockPickerInput');
    this.input = input;
    input.clockpicker({
        donetext: "Done",
        placement: 'top',
        vibrate: false,
        twelvehour: true,
        parentEl: ".clockPickerContainer",
        afterDone: function (clockPickerObj) {
            var hours = clockPickerObj.hours;
            var minutes = clockPickerObj.minutes;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var amorpm = clockPickerObj.amOrPm;
            var clockValue = hours + ':' + minutes + ' ' + amorpm;
            _korePickers.find(".footerContainer.pos-relative .chatInputBox").text(clockValue);
            var e = $.Event("keydown");
            e.keyCode = 13;
            _korePickers.find(".footerContainer.pos-relative .chatInputBox").trigger(e);
        }
    });
    this.addClockListener(mainConfig);
}
KorePickers.prototype.addClickEventClock = function (mainConfig) {
    var clockInput = this.input;
    var showAmorPm =  _korePickers.find('#clockPickerInput').data('clockpicker');
    showAmorPm.amOrPm = "AM";
    showAmorPm.options.default = "12:00";
    _korePickers.find(".form-control").hide();
    _korePickers.find(".kore-action-sheet  .datePickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".TaskPickerContainer").addClass("hide");
    _korePickers.find(".clockPickerContainer").removeClass("hide");
    // _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    clockInput.clockpicker('show').clockpicker('toggleView', 'hours');
    if (mainConfig[1].clockPicker.title) {
        _korePickers.find(".kore-action-sheet .clockPickerContainer .headerClock .choose").html(mainConfig[1].clockPicker.title);
    } else {
        _korePickers.find(".kore-action-sheet .clockPickerContainer .headerClock .choose").html("Please Choose");
    }
   
    _korePickers.find(".clockPickerContainer .confirmBTN").css({
        "display": "none"
    });
    setTimeout(function () {
        _korePickers.find(".kore-action-sheet").animate({ height: 'toggle' });
        _korePickers.find(".kore-action-sheet").removeClass("hide");
        setTimeout(function () {
            _korePickers.find(".clockPickerContainer .confirmBTN").css({
                "display": "block"
            });
        }, 300);
    }, 100);
    
    _korePickers.find(".btn.btn-sm.btn-default.btn-block.clockpicker-button").hide();
    setTimeout(function () {
        _korePickers.find(".kore-action-sheet .clockPickerContainer .clockpicker-popover").css({ "display": "block", "top": "75px ", "left": "80.5px", });
        _korePickers.find(".kore-action-sheet .clockPickerContainer .clockpicker-popover .clockpicker-plate").css({ "margin-left": "25px" });
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "0.4" });
    }, 0);
}
KorePickers.prototype.addClockListener = function (mainConfig) {
    this.addClickEventClock(mainConfig);
    _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.am-button").click(function () {
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "0.4" });
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.am-button").css({ "opacity": "1" });
    })
    _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").click(function () {
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.am-button").css({ "opacity": "0.4" });
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "1" });
    })
    _korePickers.find(".clockPickerContainer .confirmBTN").click(function () {
        _korePickers.find(".clockPickerContainer .confirmBTN").css({ "display": "block" });
        _korePickers.find(".btn.btn-sm.btn-default.btn-block.clockpicker-button").trigger("click");
        _korePickers.find(".kore-action-sheet").hide();
        _korePickers.find(".kore-action-sheet").addClass("hide");
        _korePickers.find(".kore-action-sheet").remove();

    });
   
    _korePickers.find(".clockPickerContainer .closeButton").click(function () {
        _korePickers.find(".clockPickerContainer .confirmBTN").css({
            "display": "none"
        });
        setTimeout(function () {
            _korePickers.find(".kore-action-sheet").animate({ height: 'toggle' });
            _korePickers.find(".kore-action-sheet").addClass("hide");
            setTimeout(function () {
                _korePickers.find(".clockPickerContainer .confirmBTN").css({
                    "display": "block"
                });
            }, 100);
        }, 100);
        _korePickers.find(".kore-action-sheet").remove();
    });
}
KorePickers.prototype.getClockIconTemplate = function () {
    var clockFooterTemplate = '<div class="sdkFooterIcon clock"> \
                   <button type="button"  class="sdkClock clockBtn" title="Clock"> \
                        <i class="clock"></i> \
                   </button> \
               </div>';
    return clockFooterTemplate;
}
KorePickers.prototype.addClockIconToFooter = function () {
    _korePickers.find(".clockPickerContainer").append(this.getClockIconTemplate);
}
KorePickers.prototype.showClockIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getClockIconTemplate);
}
KorePickers.prototype.getclockPickerContainer = function () {
    return '<div class="clockPickerContainer hide">\
                <div class="headerClock">\
                    <span class="choose"></span>\
                    <button class="closeButton" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                </div>\
                <input class="form-control" id="clockPickerInput" value="">\
                <div class="confirmBTN">Confirm</div>\
            </div>';
}
/*ClockPicker end*/
window.KorePickers=KorePickers;
})($);