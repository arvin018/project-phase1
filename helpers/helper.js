
function buy(denom, price) {
    const message = `Halo saya mau beli ${denom} seharga ${price}`
    const whatsapp = `https://wa.me/6285726953067?text=${message}`

    open(whatsapp, "_blank")
}

function formatRupiah(value) {
    return value.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
}

module.exports = { formatRupiah, buy }