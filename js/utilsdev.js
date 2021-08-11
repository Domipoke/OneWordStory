function CSS_Reload() {
    var a = document.head.getElementsByTagName("link")
    for (var i = 0; i<a.length;i++) {
        var x = a[i]
        a[i].remove()
        document.head.appendChild(x)
    }
}