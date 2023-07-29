/*--------------------------------*\
| 🔔 script: Halcyon (MM Edition)
| 🔥 author: au7yn
| 📅 version: build 1
|
| ⛄1�7 Don't Remove Any Credits 
\*--------------------------------*/




ModPE.langEdit("menu.copyright", "© Mojang AB | §4H§falcyon");

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
    getWidth = ctx.getWindowManager().getDefaultDisplay().getWidth(),
    getHeight = ctx.getWindowManager().getDefaultDisplay().getHeight(),
    sdcard = android.os.Environment.getExternalStorageDirectory(),
    GradientDrawable = android.graphics.drawable.GradientDrawable,
    Color = android.graphics.Color,
    parseColor = Color.parseColor,
    HSV = Color.HSVToColor,
    TextView = android.widget.TextView,
    LinearLayout = android.widget.LinearLayout,
    RelativeLayout = android.widget.RelativeLayout,
    Gravity = android.view.Gravity,
    LayoutParams = LinearLayout.LayoutParams,
    PopupWindow = android.widget.PopupWindow,
    ScrollView = android.widget.ScrollView,
    OnClickListener = android.view.View.OnClickListener,
    File = java.io.File,
    View = android.view.View,
    BufferedReader = java.io.BufferedReader,
    FileReader = java.io.FileReader,
    FOS = java.io.FileOutputStream,
    fromHtml = android.text.Html.fromHtml;

var Halcyon = new Object({
    isDev: true,
    build: "1 (MM)",
    totalModules: 0,
    mods: new Array()
});
var errorMessage = (error) => {
    if (Halcyon.isDev) clientMessage("§f[§4H§f] §e" + error.toString() + " §f(§l§o§7" + error.lineNumber + "§r§f)");

};

var ifont = "AAEAAAAPAIAAAwBwR1NVQiCLJXoAAAD8AAAAVE9TLzJWgGHeAAABUAAAAFZjbWFwBZwSOAAAAagAAAHEY3Z0IAyOBaAAABeIAAAAMGZwZ22KkZBZAAAXuAAAC3BnYXNwAAAAEAAAF4AAAAAIZ2x5ZvNMQEYAAANsAAAQRGhlYWQX/E2HAAATsAAAADZoaGVhBzwDWwAAE+gAAAAkaG10eB9AAAAAABQMAAAAIGxvY2ETfA8qAAAULAAAABJtYXhwAS4M8AAAFEAAAAAgbmFtZcIlEFoAABRgAAAC2XBvc3SUMDAYAAAXPAAAAENwcmVw6UVCwAAAIygAAACGAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAED6AGQAAUAAAJ6ArwAAACMAnoCvAAAAeAAMQECAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAQABhAGcDUv9qAFoDUgCWAAAAAQAAAAAAAAAAAAUAAAADAAAALAAAAAQAAAFgAAEAAAAAAFoAAwABAAAALAADAAoAAAFgAAQALgAAAAQABAABAAAAZ///AAAAYf//AAAAAQAEAAAAAQACAAMABAAFAAYABwAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMEBQYHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAZAAAAAAAAAAHAAAAYQAAAGEAAAABAAAAYgAAAGIAAAACAAAAYwAAAGMAAAADAAAAZAAAAGQAAAAEAAAAZQAAAGUAAAAFAAAAZgAAAGYAAAAGAAAAZwAAAGcAAAAHAAQAAP+CA98DNgC1AP8BKwFVAAATDgMXFBcVFhcWFxYXFhcWFxYXFgYiJy4BJyYGBw4BBwYVFBYXFh8BBycmIg4BBwYWFxYXMRYXFhcWOwEyNjc+AS8BNzY/ARceARcWNjc+AScuAS8BPwE+ARceARUHDgEUHgIyNjc+ATMfAR4BBwYWFx4BMzI2Nz4CNC4BJyYPAS8BNz4BNC4CIgYPAScmLwE3PgI3Njc2JyYnJgcOAQcGBwYHBiMnJicmJy4BJyYnIhcWFxYXFhcWFx4BFxY2NzY3Njc2NzY/ATIHBgcOAQcGBwYHBgcOARceAR8BBwYiJyYnJgcOASIvATc2Nz4BLgInJicuAScmLwEBFhUUBg8BFRQWFxYXFhczFjc2DwE1NCYnLgInJg4BDwEOASIuATQ/ATYyBR4BFxYGIyImJyYnJg4BBw4BDwEGBycmLwE3MjY3Njc2NzYmJy4BPgEySAcMBQEBBgMCAgUFDQ8YHVJgBwE3AhUSEw4ICQcQIAgFAwUIFRZTDQ0VFBICAgkSDSsrDREJBg0BCg0IDgQLBgsDEDkVFRYHDykTDQkBAQ0SExUjCwYCDjYVEgoLHhocEhgKEQErHQkDAQ0BDgkQCwgIBQmRBAcTBxYXBisqGRcLDR8XGxUUFg8GDxf3DBIGBwQBAQIFEAl4JxsOBCIlKmsCIikncAkPKj86BAlMBg0gCRYCBRpClQMLGws0W1gDCC0SISABBwMCAgYICg8pnR4JDAIFAw8fHSIhBCsuBRAQB1gCIyMoGQcJAgciY0RHAwYGAwICAQLKCw4UIhIjMQoQCAIHAQYJSQgODEMYBQgLERMDFAwICgw3bjcF/bAG0AECFAgDDxMiAgUQCEApFwEBAQEMDw4oDQ0RDwwhNgEFCxUYDAISBQMzAgsLDBQXOgEhCg8KBxETFxtJVAcBPhURCwIBAgMHHQ8KDgkKCg8XF1MGBwsaDAgQEw8sLAwQBAMGCA4hEAgKAxA3FRQSAgUVFxATCw0WEhQVIAkEAgwxARgTFB8WHA0KFwkOKB0IBgISJA4IBwIEBZMOFQ4RAwsTAyorGhkSHhofDAsTFRAGDxjdCxkUTzMRDgYRBQILBAgNAyYoMHglLSx+BgkIBAQBPAEBAwECAgIeS6cCBwcNPGZiAgUCAgMCPiMNDw0ICgwgkRwKDA8LBxIgHyIjJigECgkDUSMjLRsICwsSIlY9PwQGHyMnEw7+FgoFAxAVIgoMGCIxCRIBAgEDCUoLCxAQDUMWAQIDDhIDEwoHEAY3bDcGBM8CBxUNEyABAgEDQCgZBQIFAQsODiYBBw0LIDYFDBgVGBAIEwAAAwAA/6UDigMWAB4AcwCKAD1AOlkBAQCKAQMBhk8CBAMDRwACAAJvAAABAG8AAQMBbwADBAQDVAADAwRYAAQDBEyBfnh1c3FiYBwFBRUrAQ4BBw4BFBYXFhceATI2NzY3NT4BNCYnNS4BJy4BBwUiDwEOAQcGFhcWNz4BMhYXBwYHBgcOARUUFhceARUHDgEVFB4BNzY3Nj8CNjc2NTQmJyYnJicmPwEXHgIXHgEzMjY1NCYnJi8DLgEnLgEHIgMPAQ4BBw4BFh8BMzI2Nz4BPwEnJi8BAsMSIQgEAgIEDBsJCxwKCRsNBAICBAUVCgYbBf7YARI7NRYECAkOEQ4JfAdLARAUFCYMEAkcIBhqKx8NFyIQCwUCKRAlCwMCBwgGPjsEASwuAgscCAYFlA0QGA4LAiIhQDoCSgwFmgYKVBhhRRsGEQwNEQpyUiIFChAUGhUoBwQDFAQZEAkKHwoJGwwFAgIFDBsBCQodCgkBChYFAwcBfg0nIxIHDyEICAQCVBABGR4dOhIaGQ4WIhQOSQJjRSAIEhsICQYGA1kiVBoJBggMEQcGKigEAklIBxo4CQQCFBkRDRYEAQQFCIAENAYCIgH+XSEBAQEDCSMiCQUBAgQTHSYQIBAHAAADAAD/lgO7AyEAGwBLAGgAK0AoOgEAAgFHAAMBAgEDAm0AAgABAgBrAAAAbgABAQwBSWhnW1kcHQQFFisBDgEHDgEXHgEXHgEXFjI3PgE3PgEmJy4BJyYiFx4BFx4BFxYXFgYHDgEHDgEmJyYnLgEnJgYHDgEPAQYmJy4BJy4BNz4BNz4BNz4BBwYHDgEHBhYXHgEXHgEzMjY3PgE3NjQnLgEnLgEBtXK4NB8VDAozJTaTVhdRF2+zMicRLTM4nl0VSV0tWSUPMww7DQQDBQkmHAscAwgWNh09JB1CHDtdFQYBHAkhKwcCAQIHKyELKg4+kgQeHA0PBg8QHQwXDwkMDhUbEBQeBwUGCy0gCyEDHg+EaD+PRzlwK0JRDgMDEYFiTKmlREtcDANNByQcCzIQTmMZTRktUyEPHgQWRjYeIggGBQoWaEQSAh0MKWA0E0ERNWIpDigLLSV+BxoNGBEqVR8MDwYDAggLDisaEy4SJTEKAwEAAAAAAwAA/64DdQMQAD0AfAC8AC1AKiwcDQMDRbGqo3VoVE0HAUQAAwADbwAAAQBvAgEBAWa8u4qJcnEVEwQFFCsTBgcGFhcWFx4BFxYUBwYHDgEfATMXNzYmJy4BJyY0Nz4BPwE+AS4BBgcGDwEnLgEnJgYHBgcOAScuAScuAQcOARQXHgIXHgIPAQYVBhUUFxYfAQYHDgMHBhUUFjc+Aj8BNj8BMhcWFx4BNhkBIw8CBi4CJy4BBQ4BDwIGIycmLwIjERAyNjc+ATc+ATc+Ah4BFxYXHgEXFjY1NCYnLgEvASY/AT4BLwE0Njc+ATc2NC4C5wUFBgcLBhAWMhEDAhMHCAYEA72+AgIBAwQQDgIEDCwTIgkGBxEOEjstDhMRKw8JDAojJQ4HAxooGSEYcAUIEgsHCggLMhABBQMBAgIHBQIsGxQHCAsSFgsICAkIEQIiJQIKNVcOJAS3DgoFAT4FHgIGFwLFCAkMECAeBAICAQ4LrwYdCg8lDRYwDQEEAkcDDwkEBQcHCxgkAgUSHywBAwELBAkEUgYEBwwSCAsPAwoCCAoXBQIICh4OAgMDGhEUNBMLAQ0LLwoSHRQEAgQKGwkPBBQUBwMHGSULCggPAwIBAggSBwICFBsMEQbuAw0MPSsWCQQFEAcCGQ0OCyAnEhUbEwIOCQgHGic/BgwSAwIJGR84AgsMEV0iBQgBAQ0BDBkRDAEXBWkDCAUEAxYpOAoKAwMEHBD+8/7yCAMFFAoQORkEBwEVAzcfCw0JAwURDAV7BAcJCg8BDAMqbCcSARwGBBUrPRANBQEAAAgAAP/NA4UC9QAYAD0ASgBZAGYAdQCDAI0AOkA3NAEFAgFHAAIFAm8ABQMFbwYEAgMBA28AAQAAAVQAAQEAWAAAAQBMiYh0c21sUVA9PCwpHQcFFSsBDgEHDgEHDgEXHgEXFjI3PgE3NjQnLgIXHgEXFhceARQGBwYHDgEHDgEiJicuAScmNzQ3NDc2Nz4BNzYWAw4BFRQWFxY+AScuARceARUUBiMiJicmNjc2MjcOAQcGHgE2NzYnLgEXHgEVFAYjIi4BNTQ2MzI3DgEWFxY2Nz4BNC4CFx4BBwYuATc+AQHNQnwxGCsOIgsYHodaPn89WoceFBQdf6sIPm4mNxEEAQEEEjYlZz4RFD8VEWuVFAQBAQQSNip1RRBIzhIUBwkRKxsFBSQCBwgQCgYNAgUJCgUIhwkSBQwOKCoGBg4IHQkFCBAJBgsIEAkGhhYVChQOHgwJBwcQGg0IBQUIHgsHBRUC7AY6LxY8HkacSlqHHhQUHodaPn89WIJAPgtBMERUERQ/FRFVQjA+DQQBAQQXmGwWKB4KCxBVQzRBCgIC/tUFGRMMEQcQBiIXFBYeAw0HCg8KBgkTBAIYAQ4IFSkTFBcUFQsMHgMNBgkQBg0GCRAYBSUoCwcECwcRFxEQCB8FFQgNAhsKCQQAAAIAAP99A+cDPwB4APUAmUALcQoCBQvPAQYEAkdLsBtQWEAwCQEFCwQLBQRtCgEEBgsEBmsIAQYCAQAHBgBgAAsLA1gAAwMMSAAHBwFYAAEBEQFJG0AzCQEFCwQLBQRtCgEEBgsEBmsAAwALBQMLYAgBBgIBAAcGAGAABwEBB1QABwcBWAABBwFMWUAb9fLj4uHfwb6zsqilh4aFhHh3RkI9PDczDAUUKwEOAQcOAQcOAQ8BBicmBgcOARUUHgIfAR4BBgcOAQcGBw4BBw4BFBYXHgEfARYXFhceARcyOwEXFhceATI2NzY/ATMyMz4BNzY3Nj8BPgE3PgE0JicuAScmLwEuAScuATY/AT4DNTQmJy4BBwYvASYnLgEnLgEXHgEXHgEXFhceAj4BMhYUBw4EFRQWFx4BFxYVFAcOAQcGBwYPAQ4DJyYHBgcGBw4BBw4BIiYvAS4BJyYnJicmBwYmJy4BLwEmJyYnLgEnJjU0Nz4BNz4BNTQuAScuAjYzMh4BPgE3Njc+ATc+ATc+ATc2NzMWAc8fKBU2TxQJBwECAg0bMQwEAQcSGBcGFgEQBRIuKRwEBxAFAwICAwovJxMEAwgXCg0PCyQ8DBIWMztEOjQXEQw8JAsPDQoXCAMEEycvCgMCAgMFEAcCFQkqLhEFEAEWBhcYEwYBBAwxGw0CAgEFE35ZC0xRR2QQAwIBAgICCQoSJBMNCAMQMRUIGA4VOy0gAwUkMBYDAgEEAgUJFDUbDQ8SDSMcGg8NDSMNDAIPGhwjDRIPDRs1FAMFBgIEAQIDFi4mBQMhLDsVDhgIFRkgEQMNDAkjEgoJAgICAgQHBRMIHVUsEAIgIAM9BQwLGlk4GigoMAIEBhgZCAoOEhYXDwkDCAIkCR4jDgoCBBEIBgoUCggVGggEAQ4jEAcEAQYKDB0VFB4MCgYBBAcQIw4BBAgaFQgKFAoGCBEEAgcDDiMfCCQCCAMJDxcWEg4KCBkYBgQCMCsYWH8UAgM7EWRGDxsmOgkFCwYBCQ8UCQQIEwwMCw48FiErDwoHAgUJDAoEAwEGEhIQCAEBAQICCAYUDw0FBQICBAEFDQ8UBggCAgEBAQMFEBISBgEDBAoNCAUCBwoPKyEWPA4LDAwKDQwYEAkBBgsFCTovIhYOJwwnNwcCAQIAAwAAAAAD4wJwABoAPgBgACpAJzUkEwQEAgMBRwAAAwBvAAMCA28AAgECbwABAWZgXk5NLisaFwQFFCsBDgEPARceARcWFxY2Nz4BNzY/AScuAScmIyIXFhceARceAR8BBw4BBwYHDgEiJicmJy4BLwE3PgE3PgE3PgEHBgcVDgEUFhcVFhczHgEyNjczNjc1PgE1NCYnJicuASMmAceE5E0NBQsvGXCbbOBgNmElDQIED0zfghQcIkhHQyVTHRAxCQkMDDIPZYcUGFQYFIdlDzIMCwgLNBAfTiM0cxRHGgUCAgUXPAELDigODAE9FgQCAgQZOwsOERgCbguDbhMIFDcZbigaHjcgVzMRBgcVa4IMAUYGGA4wGQ0yDAsODzIMUBoEAQEEGlAMMg8OCw40DRktDRMPSRREAQsOKA4LATwXBQICBRc8AQsOFBYNDD0WBAIBAAEAAAABAACI4792Xw889QALA+gAAAAA2nqE8wAAAADaeoTzAAD/fQPoAz8AAAAIAAIAAAAAAAAAAQAAA1L/agAAA+gAAAAAA+gAAQAAAAAAAAAAAAAAAAAAAAgD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAAAAAAB9gLkA6AEzgXEB3gIIgAAAAEAAAAIAVYACAAAAAAAAgAYACgAcwAAAJILcAAAAAAAAAASAN4AAQAAAAAAAAA1AAAAAQAAAAAAAQAJADUAAQAAAAAAAgAHAD4AAQAAAAAAAwAJAEUAAQAAAAAABAAJAE4AAQAAAAAABQALAFcAAQAAAAAABgAJAGIAAQAAAAAACgArAGsAAQAAAAAACwATAJYAAwABBAkAAABqAKkAAwABBAkAAQASARMAAwABBAkAAgAOASUAAwABBAkAAwASATMAAwABBAkABAASAUUAAwABBAkABQAWAVcAAwABBAkABgASAW0AAwABBAkACgBWAX8AAwABBAkACwAmAdVDb3B5cmlnaHQgKEMpIDIwMjAgYnkgb3JpZ2luYWwgYXV0aG9ycyBAIGZvbnRlbGxvLmNvbWljb24tZm9udFJlZ3VsYXJpY29uLWZvbnRpY29uLWZvbnRWZXJzaW9uIDEuMGljb24tZm9udEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAEMAbwBwAHkAcgBpAGcAaAB0ACAAKABDACkAIAAyADAAMgAwACAAYgB5ACAAbwByAGkAZwBpAG4AYQBsACAAYQB1AHQAaABvAHIAcwAgAEAAIABmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQBpAGMAbwBuAC0AZgBvAG4AdABSAGUAZwB1AGwAYQByAGkAYwBvAG4ALQBmAG8AbgB0AGkAYwBvAG4ALQBmAG8AbgB0AFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAC0AZgBvAG4AdABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAQIBAwEEAQUBBgEHAQgBCQABYQFiAWMBZAFlAWYBZwAAAAABAAH//wAPAAAAAAAAAAAAAAAAAAAAAAAYABgAGAAYAyoDC/+yAEMDUv9qAyoDC/+yAEMDUv9qsAAsILAAVVhFWSAgS7gADlFLsAZTWliwNBuwKFlgZiCKVViwAiVhuQgACABjYyNiGyEhsABZsABDI0SyAAEAQ2BCLbABLLAgYGYtsAIsIGQgsMBQsAQmWrIoAQpDRWNFUltYISMhG4pYILBQUFghsEBZGyCwOFBYIbA4WVkgsQEKQ0VjRWFksChQWCGxAQpDRWNFILAwUFghsDBZGyCwwFBYIGYgiophILAKUFhgGyCwIFBYIbAKYBsgsDZQWCGwNmAbYFlZWRuwAStZWSOwAFBYZVlZLbADLCBFILAEJWFkILAFQ1BYsAUjQrAGI0IbISFZsAFgLbAELCMhIyEgZLEFYkIgsAYjQrEBCkNFY7EBCkOwAWBFY7ADKiEgsAZDIIogirABK7EwBSWwBCZRWGBQG2FSWVgjWSEgsEBTWLABKxshsEBZI7AAUFhlWS2wBSywB0MrsgACAENgQi2wBiywByNCIyCwACNCYbACYmawAWOwAWCwBSotsAcsICBFILALQ2O4BABiILAAUFiwQGBZZrABY2BEsAFgLbAILLIHCwBDRUIqIbIAAQBDYEItsAkssABDI0SyAAEAQ2BCLbAKLCAgRSCwASsjsABDsAQlYCBFiiNhIGQgsCBQWCGwABuwMFBYsCAbsEBZWSOwAFBYZVmwAyUjYUREsAFgLbALLCAgRSCwASsjsABDsAQlYCBFiiNhIGSwJFBYsAAbsEBZI7AAUFhlWbADJSNhRESwAWAtsAwsILAAI0KyCwoDRVghGyMhWSohLbANLLECAkWwZGFELbAOLLABYCAgsAxDSrAAUFggsAwjQlmwDUNKsABSWCCwDSNCWS2wDywgsBBiZrABYyC4BABjiiNhsA5DYCCKYCCwDiNCIy2wECxLVFixBGREWSSwDWUjeC2wESxLUVhLU1ixBGREWRshWSSwE2UjeC2wEiyxAA9DVVixDw9DsAFhQrAPK1mwAEOwAiVCsQwCJUKxDQIlQrABFiMgsAMlUFixAQBDYLAEJUKKiiCKI2GwDiohI7ABYSCKI2GwDiohG7EBAENgsAIlQrACJWGwDiohWbAMQ0ewDUNHYLACYiCwAFBYsEBgWWawAWMgsAtDY7gEAGIgsABQWLBAYFlmsAFjYLEAABMjRLABQ7AAPrIBAQFDYEItsBMsALEAAkVUWLAPI0IgRbALI0KwCiOwAWBCIGCwAWG1EBABAA4AQkKKYLESBiuwcisbIlktsBQssQATKy2wFSyxARMrLbAWLLECEystsBcssQMTKy2wGCyxBBMrLbAZLLEFEystsBossQYTKy2wGyyxBxMrLbAcLLEIEystsB0ssQkTKy2wHiwAsA0rsQACRVRYsA8jQiBFsAsjQrAKI7ABYEIgYLABYbUQEAEADgBCQopgsRIGK7ByKxsiWS2wHyyxAB4rLbAgLLEBHistsCEssQIeKy2wIiyxAx4rLbAjLLEEHistsCQssQUeKy2wJSyxBh4rLbAmLLEHHistsCcssQgeKy2wKCyxCR4rLbApLCA8sAFgLbAqLCBgsBBgIEMjsAFgQ7ACJWGwAWCwKSohLbArLLAqK7AqKi2wLCwgIEcgILALQ2O4BABiILAAUFiwQGBZZrABY2AjYTgjIIpVWCBHICCwC0NjuAQAYiCwAFBYsEBgWWawAWNgI2E4GyFZLbAtLACxAAJFVFiwARawLCqwARUwGyJZLbAuLACwDSuxAAJFVFiwARawLCqwARUwGyJZLbAvLCA1sAFgLbAwLACwAUVjuAQAYiCwAFBYsEBgWWawAWOwASuwC0NjuAQAYiCwAFBYsEBgWWawAWOwASuwABa0AAAAAABEPiM4sS8BFSotsDEsIDwgRyCwC0NjuAQAYiCwAFBYsEBgWWawAWNgsABDYTgtsDIsLhc8LbAzLCA8IEcgsAtDY7gEAGIgsABQWLBAYFlmsAFjYLAAQ2GwAUNjOC2wNCyxAgAWJSAuIEewACNCsAIlSYqKRyNHI2EgWGIbIVmwASNCsjMBARUUKi2wNSywABawBCWwBCVHI0cjYbAJQytlii4jICA8ijgtsDYssAAWsAQlsAQlIC5HI0cjYSCwBCNCsAlDKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgsAhDIIojRyNHI2EjRmCwBEOwAmIgsABQWLBAYFlmsAFjYCCwASsgiophILACQ2BkI7ADQ2FkUFiwAkNhG7ADQ2BZsAMlsAJiILAAUFiwQGBZZrABY2EjICCwBCYjRmE4GyOwCENGsAIlsAhDRyNHI2FgILAEQ7ACYiCwAFBYsEBgWWawAWNgIyCwASsjsARDYLABK7AFJWGwBSWwAmIgsABQWLBAYFlmsAFjsAQmYSCwBCVgZCOwAyVgZFBYIRsjIVkjICCwBCYjRmE4WS2wNyywABYgICCwBSYgLkcjRyNhIzw4LbA4LLAAFiCwCCNCICAgRiNHsAErI2E4LbA5LLAAFrADJbACJUcjRyNhsABUWC4gPCMhG7ACJbACJUcjRyNhILAFJbAEJUcjRyNhsAYlsAUlSbACJWG5CAAIAGNjIyBYYhshWWO4BABiILAAUFiwQGBZZrABY2AjLiMgIDyKOCMhWS2wOiywABYgsAhDIC5HI0cjYSBgsCBgZrACYiCwAFBYsEBgWWawAWMjICA8ijgtsDssIyAuRrACJUZSWCA8WS6xKwEUKy2wPCwjIC5GsAIlRlBYIDxZLrErARQrLbA9LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrErARQrLbA+LLA1KyMgLkawAiVGUlggPFkusSsBFCstsD8ssDYriiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSsBFCuwBEMusCsrLbBALLAAFrAEJbAEJiAuRyNHI2GwCUMrIyA8IC4jOLErARQrLbBBLLEIBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAlDKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7ACYiCwAFBYsEBgWWawAWNgILABKyCKimEgsAJDYGQjsANDYWRQWLACQ2EbsANDYFmwAyWwAmIgsABQWLBAYFlmsAFjYbACJUZhOCMgPCM4GyEgIEYjR7ABKyNhOCFZsSsBFCstsEIssDUrLrErARQrLbBDLLA2KyEjICA8sAQjQiM4sSsBFCuwBEMusCsrLbBELLAAFSBHsAAjQrIAAQEVFBMusDEqLbBFLLAAFSBHsAAjQrIAAQEVFBMusDEqLbBGLLEAARQTsDIqLbBHLLA0Ki2wSCywABZFIyAuIEaKI2E4sSsBFCstsEkssAgjQrBIKy2wSiyyAABBKy2wSyyyAAFBKy2wTCyyAQBBKy2wTSyyAQFBKy2wTiyyAABCKy2wTyyyAAFCKy2wUCyyAQBCKy2wUSyyAQFCKy2wUiyyAAA+Ky2wUyyyAAE+Ky2wVCyyAQA+Ky2wVSyyAQE+Ky2wViyyAABAKy2wVyyyAAFAKy2wWCyyAQBAKy2wWSyyAQFAKy2wWiyyAABDKy2wWyyyAAFDKy2wXCyyAQBDKy2wXSyyAQFDKy2wXiyyAAA/Ky2wXyyyAAE/Ky2wYCyyAQA/Ky2wYSyyAQE/Ky2wYiywNysusSsBFCstsGMssDcrsDsrLbBkLLA3K7A8Ky2wZSywABawNyuwPSstsGYssDgrLrErARQrLbBnLLA4K7A7Ky2waCywOCuwPCstsGkssDgrsD0rLbBqLLA5Ky6xKwEUKy2wayywOSuwOystsGwssDkrsDwrLbBtLLA5K7A9Ky2wbiywOisusSsBFCstsG8ssDorsDsrLbBwLLA6K7A8Ky2wcSywOiuwPSstsHIsswkEAgNFWCEbIyFZQiuwCGWwAyRQeLABFTAtAEu4AMhSWLEBAY5ZsAG5CAAIAGNwsQAFQrITAQAqsQAFQrMKBgEIKrEABUKzEgQBCCqxAAZCugLAAAEACSqxAAdCugBAAAEACSqxAwBEsSQBiFFYsECIWLEDZESxJgGIUVi6CIAAAQRAiGNUWLEDAERZWVlZswwGAQwquAH/hbAEjbECAEQAAA==";

/*--------------------------------*\
| 🔔 Module system
| 🔥 author: au7yn
\*--------------------------------*/


var createModule = (names, states, category_) => {
    Halcyon.mods.push({
        name: names.split(","), //.split(":")
        state: states,
        category: category_,
        settings: [],
        view: [null, null], //1 - array 2 - bind
        bind: null,
        pos: [ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2],
        code: 0
    });
    Halcyon.totalModules++;
};
var getModule = (named) => {
    for (var i in Halcyon.mods) {
        if (Halcyon.mods[i].name[0] == named) {
            return Halcyon.mods[i];
        }
    }
};
var getState = (mod) => {
    return mod.state[0];
};
var getBindState = (mod) => {
    return mod.state[1];
};
var getCode = (mod) => {
    return mod.code;
};
var createSettings = (module, names, types, value) => {
    module.settings.push(new Object({
        name: names,
        type: types,
        values: types == "bool" ? value : value.split(",")
    }));
    //log, + in settings changer .split(":") when type var or string
};
var getSettings = (module, named, id) => {
    for (let i in module.settings) {
        if (module.settings[i].name == named) {
            if (module.settings[i].type == "bool") return module.settings[i].values;
            if (module.settings[i].type == "string") return module.settings[i].values[id];
            if (module.settings[i].type == "int") return module.settings[i].values[id]; //.split(",")

        };
    }

};
var associateModule = (name, states, categ, settings, code) => {
    try {
        createModule(name, states, categ);
        if (settings != 0) {
            settings.forEach(function (e) {
                createSettings(getModule(name.split(",")[0]), e.name, e.type, e.value);
            })
        } else {};
        getModule(name.split(",")[0]).code = code;
    } catch (e) {
        errorMessage(e)
    }
};

/*------------------------*\
| 🔥 Modules
\*------------------------*/

associateModule("HitBox,H", [!1, !1], "Combat", [{
    name: "X-Scale",
    type: "int",
    value: "10,0.1,15"
}, {
    name: "Y-Scale",
    type: "int",
    value: "10,0.1,15"
}, {
    name: "From EntityList",
    type: "bool",
    value: false
}, {
    name: "Type",
    type: "string",
    value: "Nearest,Nearest,Pointed,All"
}], {
    getNearestEntity(range) {
        var mod = getModule("HitBox");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (sett) {
            var players = list;
        } else {
            var players = Server.getAllPlayers();
        }
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(i) && i != Player.getEntity()) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        }
        return ent;
    },
    tick() {
        var mod = getModule("HitBox");
        var sett = getSettings(mod, "Type", 0);
        if (sett == "Nearest") {
            if (getState(mod) && confirmScreenSafe() && !opn) {
                let x = getSettings(mod, "X-Scale", 0);
                let y = getSettings(mod, "Y-Scale", 0);
                if (getCode(mod).getNearestEntity(15) != null) {
                    Entity.setCollisionSize(getCode(mod).getNearestEntity(15), x, y);
                }
            }
        }
    },
    attack(a, v) {
        var mod = getModule("HitBox");
        var sett = getSettings(mod, "Type", 0);
        if (sett == "Pointed") {
            if (!getCode(getModule("ClickFriends")).isFriend(v)) {
                if (getState(mod)) {
                    let x = getSettings(mod, "X-Scale", 0);
                    let y = getSettings(mod, "Y-Scale", 0);
                    if (a == Player.getEntity()) {
                        Entity.setCollisionSize(v, x, y);
                    }
                } else {
                    if (a == Player.getEntity()) {
                        Entity.setCollisionSize(v, 0.8, 1.8);
                    }
                }
            }
        }

    },
    toggle() {
        //customMessage('lol')
    }
});
associateModule("KillAura,K", [!1, !1], "Combat", [{
    name: "CPS",
    type: "int",
    value: "20,1,20"
}, {
    name: "Range",
    type: "int",
    value: "4.2,0.1,8"
}, {
    name: "From EntityList",
    type: "bool",
    value: false
}, {
    name: "Mode",
    type: "string",
    value: "Single,Single,Switch,Multi"
}], {
    toggled: false,
    last: 0,
    target: -1,
    getNearestEntity(range) {
        var mod = getModule("KillAura");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (sett) {
            var players = list;
        } else {
            var players = Server.getAllPlayers();
        }
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(i) && i != Player.getEntity()) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        }
        return ent;
    },
    getDistance(ent) {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        var x1 = Entity.getX(ent);
        var y1 = Entity.getY(ent);
        var z1 = Entity.getZ(ent);
        var x2 = Math.pow(x1 - x, 2);
        var y2 = Math.pow(y1 - y, 2);
        var z2 = Math.pow(z1 - z, 2);
        return Math.sqrt(x2 + y2 + z2);
    },
    swing() {
        var mod = getModule("KillAura");
        var CPS = getSettings(mod, "CPS", 0);
        var Range = getSettings(mod, "Range", 0);
        var Mode = getSettings(mod, "Mode", 0);
        var sett = getSettings(mod, "From EntityList", 0);
        var state = getState(mod);
        var inst = new android.app.Instrumentation;
        if (state && confirmScreenSafe() && !opn) {
            if (Mode == "Single") {
                var ent = getCode(mod).getNearestEntity(Range);
                if (ent != -1 && getCode(getModule("EntityList")).isValid(ent)) {
                    Entity.setCollisionSize(ent, getCode(mod).getDistance(ent) * 2 + 2, getCode(mod).getDistance(ent) * 2 + 2);
                    inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                }
            };
            if (Mode == "Switch") {
                var ent = getCode(mod).getNearestEntity(Range);
                if (ent != -1 && getCode(getModule("EntityList")).isValid(ent)) {
                    Entity.setCollisionSize(ent, getCode(mod).getDistance(ent) * 2 + 2, getCode(mod).getDistance(ent) * 2 + 2);
                    inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                    if (getCode(getModule("EntityList")).isValid(ent)) Entity.setCollisionSize(ent, 0.8, 1.8);
                }
            };
            if (Mode == "Multi") {
                let nearestEntities = [];
                var list = getCode(getModule("EntityList")).list;
                if (sett) {
                    var players = list;
                } else {
                    var players = Server.getAllPlayers();
                }
                players.forEach(function (e) {
                    if (e != Player.getEntity() && !getCode(getModule("ClickFriends")).isFriend(e) && e != -1 && getCode(getModule("EntityList")).isValid(e)) {
                        if (getCode(mod).getDistance(e) <= Range) {
                            nearestEntities.push(e);
                        }
                    }
                });
                if (nearestEntities.length != 0 && getCode(getModule("EntityList")).isValid(nearestEntities[getCode(mod).last])) {
                    Entity.setCollisionSize(nearestEntities[getCode(mod).last], getCode(mod).getDistance(nearestEntities[getCode(mod).last]) * 2 + 2, getCode(mod).getDistance(nearestEntities[getCode(mod).last]) * 2 + 2);
                    inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                    getCode(mod).last++;
                };
                var lngth = nearestEntities.length - 1;
                if (getCode(mod).last > lngth) {
                    getCode(mod).last = 0;
                };
                players.forEach(function (e) {
                    if (getCode(getModule("EntityList")).isValid(e)) Entity.setCollisionSize(e, 0.6, 1.8);
                });
            };
        }
    },
    init() {
        try {
            var mod = getModule("KillAura");
            var CPS = getSettings(mod, "CPS", 0);
            var Range = getSettings(mod, "Range", 0);
            var Mode = getSettings(mod, "Mode", 0);
            var sett = getSettings(mod, "From EntityList", 0);
            var state = getState(mod);
            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run() {
                                try {
                                    if (getState(mod)) getCode(mod).swing();

                                    new android.os.Handler().postDelayed(this, 1000 / CPS);
                                } catch (e) {
                                    //getCode(mod).swing();

                                    //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                    errorMessage(e + ' at #' + e.lineNumber);
                                    getCode(mod).init(); //reload
                                }
                            }
                        }), 1000 / CPS);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },

    toggle() {
        try {
            var mod = getModule("KillAura");
            if (getCode(mod).toggled == false) {
                getCode(mod).init();
                getCode(mod).toggled = true;
            }
        } catch (e) {
            errorMessage(e)
        }
    }

}); //q - 45
associateModule("AutoClicker,C", [!1, !1], "Combat", [{
    name: "CPS",
    type: "int",
    value: "20,1,20"
}, {
    name: "Right Click",
    type: "bool",
    value: true
}], {
    toggled: false,
    init() {
        try {
            var mod = getModule("AutoClicker");
            var CPS = getSettings(mod, "CPS", 0);
            var state = getState(mod);
            var inst = new android.app.Instrumentation;


            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run() {
                                try {
                                    var mod = getModule("AutoClicker");
                                    var CPS = getSettings(mod, "CPS", 0);
                                    var RC = getSettings(mod, "CPS", 0);
                                    var state = getState(mod);
                                    var inst = new android.app.Instrumentation;
                                    if (state && confirmScreenSafe() && !opn) {
                                        RC ? inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_E) : inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                                    }

                                    new android.os.Handler().postDelayed(this, 1000 / CPS);
                                } catch (e) {
                                    //getCode(mod).swing();

                                    //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                    errorMessage(e + ' at #' + e.lineNumber);
                                    getCode(mod).init(); //reload
                                }
                            }
                        }), 1000 / CPS);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },
    toggle() {
        try {
            var mod = getModule("AutoClicker");
            if (getCode(mod).toggled == false) {
                getCode(mod).init();
                getCode(mod).toggled = true;
            }
        } catch (e) {
            errorMessage(e)
        }
    }

}); //q - 45
associateModule("TriggerBot,T", [!1, !1], "Combat", [{
    name: "CPS",
    type: "int",
    value: "12,1,20"
}, {
    name: "First tap delay (ms)",
    type: "int",
    value: "0,1,150"
}, {
    name: "Random CPS",
    type: "bool",
    value: false
}, {
    name: "Minimal CPS",
    type: "int",
    value: "8,1,20"
}, {
    name: "Maximal CPS",
    type: "int",
    value: "12,1,20"
}, {
    name: "Distance",
    type: "int",
    value: "8,0.1,15"
}], {
    toggled: false,
    delayed: false,
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getDistance(ent) {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        var x1 = Entity.getX(ent);
        var y1 = Entity.getY(ent);
        var z1 = Entity.getZ(ent);
        var x2 = Math.pow(x1 - x, 2);
        var y2 = Math.pow(y1 - y, 2);
        var z2 = Math.pow(z1 - z, 2);
        return Math.sqrt(x2 + y2 + z2);
    },
    init() {
        try {
            var mod = getModule("TriggerBot");
            var rnd = getSettings(mod, "Random CPS", 0);
            var dst = getSettings(mod, "Distance", 0);
            if (!rnd) {
                var CPS = getSettings(mod, "CPS", 0);
            } else {
                var CPS = getCode(mod).random(getSettings(mod, "Minimal CPS", 0), getSettings(mod, "Maximal CPS", 0))
            }
            var state = getState(mod);
            var inst = new android.app.Instrumentation;


            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postAtTime(new java.lang.Runnable({
                            run() {
                                try {
                                    var mod = getModule("TriggerBot");
                                    var rnd = getSettings(mod, "Random CPS", 0);
                                    var dst = getSettings(mod, "Distance", 0);
                                    if (!rnd) {
                                        var CPS = getSettings(mod, "CPS", 0);
                                    } else {
                                        var CPS = getCode(mod).random(getSettings(mod, "Minimal CPS", 0), getSettings(mod, "Maximal CPS", 0))
                                    }
                                    var delay = getSettings(mod, "First tap delay (ms)", 0);
                                    var state = getState(mod);
                                    var inst = new android.app.Instrumentation;
                                    if (state && confirmScreenSafe() && !opn && Player.getPointedEntity() != -1) {
                                        if (!getCode(getModule("ClickFriends")).isFriend(Player.getPointedEntity()) && getCode(mod).getDistance(Player.getPointedEntity()) <= dst) {
                                            if (delay != 0 && getCode(mod).delayed == false) {
                                                java.lang.Thread.sleep(delay);
                                                getCode(mod).delayed = true
                                            };
                                            inst.sendKeyDownUpSync(45) //45android.view.KeyEvent.KEYCODE_Q
                                        };
                                    } else {
                                        getCode(mod).delayed = false;
                                    }

                                    new android.os.Handler().postAtTime(this, 1000 / CPS);
                                } catch (e) {
                                    //getCode(mod).swing();

                                    //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                    errorMessage(e + ' at #' + e.lineNumber);
                                    getCode(mod).init(); //reload
                                }
                            }
                        }), 1000 / CPS);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },
    toggle() {
        try {
            var mod = getModule("TriggerBot");
            if (getCode(mod).toggled == false) {
                getCode(mod).init();
                getCode(mod).toggled = true;
            }
        } catch (e) {
            errorMessage(e)
        }
    }

});
associateModule("TargetHUD,T", [!1, !1], "Combat", [{
    name: "Distance",
    type: "int",
    value: "200,1,200"
},{
    name: "Show Item",
    type: "bool",
    value: false
}], {
    gui: null,
    btn: null,
    health: null,
    showing: -1,
    x: ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.7,
    y: ctx.getWindowManager().getDefaultDisplay().getHeight() / 3,
    getDistance(ent) {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        var x1 = Entity.getX(ent);
        var y1 = Entity.getY(ent);
        var z1 = Entity.getZ(ent);
        var x2 = Math.pow(x1 - x, 2);
        var y2 = Math.pow(y1 - y, 2);
        var z2 = Math.pow(z1 - z, 2);
        return Math.sqrt(x2 + y2 + z2);
    },
    getNearestEntity(range) {
        var mod = getModule("TargetHUD");
        var players = Server.getAllPlayers();
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(i) && i != Player.getEntity()) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                var getMoveDistance = (x, y, x1, y1) => {
                    return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
                }
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        }
        return ent;
    },
    tick() {
        var mod = getModule("TargetHUD");
        if (getState(mod)) {
            uithread(() => {
                try {
                    var ent = getCode(mod).getNearestEntity(getSettings(mod, "Distance", 0));
                    if(ent != null){
                         if(getCode(mod).gui == null || !getCode(mod).gui.isShowing()){
                            getCode(mod).showbutton(ent);
                            //getCode(mod).btn.setText(clearName(Entity.getNameTag(player)) + " [" + Math.round(getCode(mod).getDistance(player)) + "m]");
                         }else{
                             if(ent != getCode(mod).showing){
                                getCode(mod).gui.dismiss();
                                getCode(mod).showbutton(ent);
                             }else{
                                getCode(mod).btn.setText(clearName(Entity.getNameTag(ent)) + " [" + Math.round(getCode(mod).getDistance(ent)) + "m]");
                                var handitem = getCarriedItem(ent);
                                if (handitem != -1) {
                                    var handName = Item.getName(getCarriedItem(ent))
                                } else {
                                    var handName = "null"
                                }
                                if(getCode(mod).getNearestEntity(getSettings(mod, "Show Item", 0)))getCode(mod).health.setText("Hand: " + clearName(handName));
                                //getCode(mod).health.setText("❤️ " + Entity.getHealth(ent) + "/" + Entity.getMaxHealth(ent));
                             }
                         }
                    }
                    //if (getCode(mod).gui != null && getCode(mod).gui.isShowing()) {
                    //    getCode(mod).btn.setText(clearName(Entity.getNameTag(player)) + " [" + Math.round(getCode(mod).getDistance(player)) + "m]");
                   // }
                } catch (e) {
                    errorMessage(e)
                }
            })
        }
    },
    showbutton(player) {
        var mod = getModule("TargetHUD");
        uithread(()=>{

            getCode(mod).showing = player;

            let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = getCode(mod).x;
                let PosY = getCode(mod).y;
                var moving = false;
            let lay = new android.widget.LinearLayout(ctx);
            lay.setOrientation(1);
            lay.setBackground(style.custom_corner("#2d2d2d", [10, 10, 10, 10, 10, 10, 10, 10]));
            var handitem = getCarriedItem(player);
                                if (handitem != -1) {
                                    var handName = Item.getName(getCarriedItem(player))
                                } else {
                                    var handName = "null"
                                }

            getCode(mod).btn = new android.widget.TextView(ctx);
            getCode(mod).btn.setText(clearName(Entity.getNameTag(player)) + " [" + Math.round(getCode(mod).getDistance(player)) + "m]");
            getCode(mod).btn.setPadding(15,5,15,10);
            getCode(mod).btn.setTextColor(android.graphics.Color.WHITE);
            getCode(mod).btn.setTextSize(gs(17));
            //btn.setId(player);
            //btn.setBackground(style.custom_corner("#2d2d2d", [10, 10, 10, 10, 10, 10, 10, 10]));
            getCode(mod).btn.setGravity(android.view.Gravity.CENTER);
            getCode(mod).btn.setSingleLine(true);
            getCode(mod).btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            getCode(mod).btn.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            getCode(mod).btn.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function (view, motionEvent) {
                    try {
                        move = true;

                        switch (motionEvent.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                //btn.setBackground(module.state[0] ? style.custom_corner("#a80000", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]) : style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));
                                getCode(mod).btn.setTextColor(android.graphics.Color.parseColor("#5d5d5d"));
                                if(getCode(mod).getNearestEntity(getSettings(mod, "Show Item", 0)))getCode(mod).health.setTextColor(android.graphics.Color.parseColor("#5d5d5d"));
                                break;
                            case android.view.MotionEvent.ACTION_UP:
                                getCode(mod).btn.setTextColor(android.graphics.Color.WHITE);
                                if(getCode(mod).getNearestEntity(getSettings(mod, "Show Item", 0)))getCode(mod).health.setTextColor(android.graphics.Color.WHITE);
                                break;
                            case android.view.MotionEvent.ACTION_CANCEL:
                                break;
                        }

                        if (!move) return false;
                        switch (motionEvent.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                dx = PosX - motionEvent.getRawX();
                                dy = PosY - motionEvent.getRawY();
                                break;
                            case android.view.MotionEvent.ACTION_MOVE:
                                if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                    moving = true;
                                    PosX = (motionEvent.getRawX() + dx);
                                    PosY = (motionEvent.getRawY() + dy);
                                    getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    getCode(mod).x = PosX;
                                    getCode(mod).y = PosY;
                                }
                                break;
                            case android.view.MotionEvent.ACTION_UP:
                            case android.view.MotionEvent.ACTION_CANCEL:
                                move = false;
                                moving = false
                                break;
                        }
                    } catch (e) {
                        errorMessage(e);
                    }
                    return true;
                }
            }));
            lay.addView(getCode(mod).btn);

            getCode(mod).health = new android.widget.TextView(ctx);
            getCode(mod).health.setText("Hand: " + clearName(handName));
            getCode(mod).health.setPadding(5,5,5,5);
            getCode(mod).health.setTextColor(android.graphics.Color.WHITE);
            getCode(mod).health.setTextSize(gs(17));
            //btn.setId(player);
            //btn.setBackground(style.custom_corner("#2d2d2d", [10, 10, 10, 10, 10, 10, 10, 10]));
            getCode(mod).health.setGravity(android.view.Gravity.CENTER);
            getCode(mod).health.setSingleLine(true);
            getCode(mod).health.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            getCode(mod).health.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            getCode(mod).health.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function (view, motionEvent) {
                    try {
                        move = true;

                        switch (motionEvent.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                //btn.setBackground(module.state[0] ? style.custom_corner("#a80000", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]) : style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));
                                getCode(mod).btn.setTextColor(android.graphics.Color.parseColor("#5d5d5d"));
                                if(getCode(mod).getNearestEntity(getSettings(mod, "Show Item", 0)))getCode(mod).health.setTextColor(android.graphics.Color.parseColor("#5d5d5d"));
                                break;
                            case android.view.MotionEvent.ACTION_UP:
                                getCode(mod).btn.setTextColor(android.graphics.Color.WHITE);
                                if(getCode(mod).getNearestEntity(getSettings(mod, "Show Item", 0)))getCode(mod).health.setTextColor(android.graphics.Color.WHITE);
                                break;
                            case android.view.MotionEvent.ACTION_CANCEL:
                                break;
                        }

                        if (!move) return false;
                        switch (motionEvent.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                dx = PosX - motionEvent.getRawX();
                                dy = PosY - motionEvent.getRawY();
                                break;
                            case android.view.MotionEvent.ACTION_MOVE:
                                if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                    moving = true;
                                    PosX = (motionEvent.getRawX() + dx);
                                    PosY = (motionEvent.getRawY() + dy);
                                    getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    getCode(mod).x = PosX;
                                    getCode(mod).y = PosY;
                                }
                                break;
                            case android.view.MotionEvent.ACTION_UP:
                            case android.view.MotionEvent.ACTION_CANCEL:
                                move = false;
                                moving = false
                                break;
                        }
                    } catch (e) {
                        errorMessage(e);
                    }
                    return true;
                }
            }));
            if(getCode(mod).getNearestEntity(getSettings(mod, "Show Item", 0)))lay.addView(getCode(mod).health);


            getCode(mod).gui = new android.widget.PopupWindow(lay, -2, -2);
            //getCode(mod).gui.setTouchable(!!0);
            getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
            //getCode(mod).gui.setTouchable(!!0);
            getCode(mod).gui.update(getCode(mod).x,getCode(mod).y, -1,-1);
        })
    }

});
associateModule("SafeDistance,SD", [!1, !1], "Combat", [{
    name: "Distance",
    type: "int",
    value: "3.6,0.1,8"
}], {
    getDistance(ent) {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        var x1 = Entity.getX(ent);
        var y1 = Entity.getY(ent);
        var z1 = Entity.getZ(ent);
        var x2 = Math.pow(x1 - x, 2);
        var y2 = Math.pow(y1 - y, 2);
        var z2 = Math.pow(z1 - z, 2);
        return Math.sqrt(x2 + y2 + z2);
    },
    checkTarget(ent) {
        var mod = getModule("SafeDistance");
        var dist = getSettings(mod, "Distance", 0);
        if (getState(mod)) {
            if (getCode(mod).getDistance(ent) > dist) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }
}); //getCode(getModule("SafeDistance")).checkTarget(ent)
associateModule("AntiKnockback,AK", [!1, !1], "Combat", 0, {
    timing: 0,
    hp: 0,
    tick() {
        var mod = getModule("AntiKnockback");
        if (getState(mod) && confirmGameScreen() && !getState(getModule("X-Ray"))) {
            getCode(mod).timing = 0;
            if (getCode(mod).hp > Entity.getHealth(Player.getEntity())) {
                getCode(mod).timing = 1;
                setVelX(Player.getEntity(), 0);
                setVelY(Player.getEntity(), 0);
                setVelZ(Player.getEntity(), 0);
                Entity.setImmobile(Player.getEntity(), true);
            }
            if (getCode(mod).timing == 0) {
                Entity.setImmobile(Player.getEntity(), false);
            }
            getCode(mod).hp = Entity.getHealth(Player.getEntity());
            if (getCode(mod).timing != 0) {
                getCode(mod).timing--;
            }
        }
    }
});
associateModule("AimBot,A", [!1, !1], "Combat", [{
    name: "HeadLock",
    type: "bool",
    value: true
}, {
    name: "Lock",
    type: "bool",
    value: true
}, {
    name: "From EntityList",
    type: "bool",
    value: false
}, {
    name: "Mode",
    type: "string",
    value: "Nearest,Pointed,Nearest"
}, {
    name: "Distance",
    type: "int",
    value: "6,0.1,25"
}], {
    rotating: false,
    target: -1,
    getDistance(ent) {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        var x1 = Entity.getX(ent);
        var y1 = Entity.getY(ent);
        var z1 = Entity.getZ(ent);
        var x2 = Math.pow(x1 - x, 2);
        var y2 = Math.pow(y1 - y, 2);
        var z2 = Math.pow(z1 - z, 2);
        return Math.sqrt(x2 + y2 + z2);
    },
    getNearestEntity(range) {
        var mod = getModule("AimBot");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (sett) {
            var players = list;
        } else {
            var players = Server.getAllPlayers();
        }
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(i) && i != Player.getEntity()) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        }
        return ent;
    },
    avr() {
        var mod = getModule("AimBot");
        var sett = getSettings(mod, "Lock", 0);
        var sett1 = getSettings(mod, "Distance", 0);
        var mode = getSettings(mod, "Mode", 0);
        if (getState(mod)) {
            if (sett || mode == "Nearest")
                if (mode == "Nearest") getCode(mod).target = getCode(mod).getNearestEntity(sett1);
            if (getCode(mod).target != -1 && getCode(mod).getDistance(getCode(mod).target) <= sett1 && !getCode(getModule("ClickFriends")).isFriend(getCode(mod).target)) {
                getCode(mod).aim(getCode(mod).target);
                getCode(mod).rotating = true
            } else {
                getCode(mod).rotating = false //getCode(getModule("AimBot")).rotating
            }
        } else {
            getCode(mod).rotating = false
        }
    },
    aim(ent) {
        var mod = getModule("AimBot");
        var sett = getSettings(mod, "HeadLock", 0);
        if (ent != null) {
            var x = Entity.getX(ent) - Player.getX();
            if (sett)
                var y = Entity.getY(ent) - Player.getY()
            else
                var y = Entity.getY(ent) - 1 - Player.getY();
            var z = Entity.getZ(ent) - Player.getZ();

            if (Entity.getEntityTypeId(ent) != 63) y += 0.5;
            var a = 0.5 + Entity.getX(ent);
            var b = Entity.getY(ent);
            var c = 0.5 + Entity.getZ(ent);
            var len = Math.sqrt(x * x + y * y + z * z);
            var y = y / len;
            var pitch = Math.asin(y);
            pitch = pitch * 180.0 / Math.PI;
            pitch = -pitch;
            var yaw = -Math.atan2(a - (Player.getX() + 0.5), c - (Player.getZ() + 0.5)) * (180 / Math.PI);
            if (pitch < 89 && pitch > -89) {
                Entity.setRot(Player.getEntity(), yaw, pitch);
            }
        }
    },
    attack(a, v) {
        var mod = getModule("AimBot");
        var sett = getSettings(mod, "Distance", 0);
        var mode = getSettings(mod, "Mode", 0);
        if (getState(mod)) {
            if (a == Player.getEntity() && getCode(mod).getDistance(v) <= sett && mode == "Pointed") {
                getCode(mod).aim(v);
                getCode(mod).target = v
            }
        }
    }
});
associateModule("TPAura,TA", [!1, !1], "Combat", [{
    name: "Expand",
    type: "int",
    value: "1,0.1,10"
}], {
    attack(a, v) {
        var mod = getModule("TPAura");
        var sett = getSettings(mod, "Expand", 0);
        if (getState(mod)) {
            if (a == Player.getEntity()) {
                Entity.setPosition(Player.getEntity(), Entity.getX(v), Entity.getY(v) + sett, Entity.getZ(v));
                setVelY(Player.getEntity(), 0.05);
            }
        }
    }
});
associateModule("HitBoost,HB", [!1, !1], "Combat", [{
    name: "Velocity",
    type: "int",
    value: "1.3,0.1,5"
}], {
    attack(a, v) {
        var mod = getModule("HitBoost");
        var sett = getSettings(mod, "Velocity", 0);
        if (getState(mod)) {
            if (a == Player.getEntity()) {
                var pitch = ((Entity.getPitch(Player.getEntity()) + 90) * Math.PI) / 180;
                var yaw = ((Entity.getYaw(Player.getEntity()) + 90) * Math.PI) / 180;
                var X = Math.sin(pitch) * Math.cos(yaw);
                var Y = Math.cos(pitch);
                var Z = Math.sin(pitch) * Math.sin(yaw);
                setVelX(Player.getEntity(), X * sett);
                setVelY(Player.getEntity(), Y * sett);
                setVelZ(Player.getEntity(), Z * sett);
            }
        }
    }
});
associateModule("Follow,Fw", [!1, !1], "Combat", [{
    name: "From EntityList",
    type: "bool",
    value: false
}], {
    getNearestEntity(range) {
        var mod = getModule("Follow");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (sett) {
            var players = list;
        } else {
            var players = Server.getAllPlayers();
        }
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(i)) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        }
        return ent;
    },
    isLiquid(id) {
        if (id == 8 || id == 9 || id == 10 || id == 11) return true;
        return false;
    },
    isInWater() {
        var mod = getModule("Follow");
        if (getCode(mod).isLiquid(Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()))) return true;
        return false;
    },
    onground: function () {
        var mod = getModule("Follow");
        var y = Player.getY();
        while (y > 1) y -= 1;
        if ((Math.round(y * 100) >= 61 && Math.round(y * 100) <= 63) && Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()) != 0 && !getCode(mod).isLiquid(Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()))) return true;
        if ((Math.round(y * 100) >= 11 && Math.round(y * 100) <= 13) && Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()) != 0 && !getCode(mod).isLiquid(Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()))) return true;
        return false;
    },
    tick(a, v) {
        var mod = getModule("Follow");
        if (getState(mod)) {
            var target = getCode(mod).getNearestEntity(150);
            if (target != -1 && target != null) {
                let x = Player.getX();
                let z = Player.getZ();
                let x2 = Entity.getX(target);
                let z2 = Entity.getZ(target);
                if (getCode(mod).onground() && Player.getY() - 1.62 - (Entity.getEntityTypeId(target) == 63 ? Entity.getY(target) - 1.62 : Entity.getY(target)) < -0.8)
                    setVelY(Player.getEntity(), 0.42);
                if (getCode(mod).isInWater() && Player.getY() - 1.62 - (Entity.getEntityTypeId(target) == 63 ? Entity.getY(target) - 1.62 : Entity.getY(target)) < -0.8)
                    setVelY(Player.getEntity(), 0.3);

                let dist = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(z - z2, 2));
                if (dist <= 1)
                    return;
                setVelX(Player.getEntity(), -Math.max(-0.35, Math.min(0.35, ((x - x2) / dist) / 3)));
                setVelZ(Player.getEntity(), -Math.max(-0.35, Math.min(0.35, ((z - z2) / dist) / 3)));
            }
        }
    }
});
associateModule("AttackParticles,AP", [!1, !1], "Combat", 0, {
    roundPart(part, x, y, z, diameter, size, velX, velY, velZ) {
        diameter = diameter / 2;
        if (!velX) {
            velX = 0;
        }
        if (!velY) {
            velY = 0;
        }
        if (!velZ) {
            velZ = 0;
        }
        for (var i = 0; i < 2 * (Math.PI * diameter); i = i + 0.1) {
            Level.addParticle(part, x + 0.5 + Math.sin(i) * diameter, y, z + 0.5 + Math.cos(i) * diameter, velX, velY, velZ, size)
        }
    },
    attack(a, v) {
        var mod = getModule("AttackParticles");
        if (getState(mod)) {
            if (a == Player.getEntity()) {
                getCode(mod).roundPart(ParticleType.crit, Entity.getX(v) - .5, Entity.getY(v), Entity.getZ(v) - .5, 1.3, 1)
            }
        }
    }
});
associateModule("TargetSpin,TS", [!1, !1], "Combat", [{
    name: "Velocity",
    type: "int",
    value: "1,0.1,2"
}, {
    name: "Range",
    type: "int",
    value: "2,0.1,5"
}], {
    target: -1,
    fakeYaw: 0,
    getDistance(ent) {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        var x1 = Entity.getX(ent);
        var y1 = Entity.getY(ent);
        var z1 = Entity.getZ(ent);
        var x2 = Math.pow(x1 - x, 2);
        var y2 = Math.pow(y1 - y, 2);
        var z2 = Math.pow(z1 - z, 2);
        return Math.sqrt(x2 + y2 + z2);
    },
    getNearestEntity(range) {
        var mod = getModule("TargetSpin");
        var players = Server.getAllPlayers();

        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(i)) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        }
        return ent;
    },
    inRange(x, min, max) {
        return ((x - min) * (x - max) <= 0);
    },
    tick() {
        var mod = getModule("TargetSpin");
        var range = getSettings(mod, "Range", 0);
        var vel = getSettings(mod, "Velocity", 0);
        getCode(mod).target = getCode(mod).getNearestEntity(150);
        if (getState(mod) && getCode(mod).target != -1) {
            var target = getCode(mod).target;
            var fakeYaw = getCode(mod).fakeYaw;
            if (getCode(mod).inRange(fakeYaw, -180, 180)) {
                fakeYaw = fakeYaw + 18
            }
            if (fakeYaw > 180) {
                fakeYaw = -168
            }
            getCode(mod).fakeYaw = fakeYaw;
            var dirV = cueCoord(fakeYaw, 0);
            if (Entity.getX(target) != 0 && Entity.getZ(target) != 0) {
                if (Player.getX() + (dirV.x * 3) - Entity.getX(Player.getEntity()) > 0.5 || Player.getX() + (dirV.x * range) - Entity.getX(Player.getEntity()) < -0.5 || Player.getY() + (dirV.y * range) - Entity.getY(Player.getEntity()) > 0.5 || Player.getY() + (dirV.y * range) - Entity.getY(Player.getEntity()) < -0.5 || Player.getZ() + (dirV.z * range) - Entity.getZ(Player.getEntity()) > 0.5 || Player.getZ() + (dirV.z * range) - Entity.getZ(Player.getEntity()) < -0.5) {
                    Entity.setVelX(Player.getEntity(), (Entity.getX(target) + (dirV.x * range) - Entity.getX(Player.getEntity())) / 5 * vel);
                    //   Entity.setVelY(Player.getEntity(), (Entity.getY(target) + (dirV.y * range) - Entity.getY(Player.getEntity())) / 5);
                    Entity.setVelZ(Player.getEntity(), (Entity.getZ(target) + (dirV.z * range) - Entity.getZ(Player.getEntity())) / 5 * vel);
                } else {
                    Entity.setVelX(Player.getEntity(), 0);
                    Entity.setVelY(Player.getEntity(), 0);
                    Entity.setVelZ(Player.getEntity(), 0);
                }
            }
        }
    },
    toggle() {
        var mod = getModule("TargetSpin");
        if (!getState(mod)) {
            getCode(mod).target = -1
        }
    }
});
associateModule("Behind,B", [!1, !1], "Combat", [{
    name: "From EntityList",
    type: "bool",
    value: false
}, {
    name: "Mode",
    type: "string",
    value: "Nearest,Nearest,Pointed"
}, {
    name: "Lock",
    type: "bool",
    value: true
}, {
    name: "Range (Nearest)",
    type: "int",
    value: "10,0.1,25"
}, {
    name: "Gap",
    type: "int",
    value: "3,0.1,8"
}], {
    target: -1,
    getNearestEntity(range) {
        var mod = getModule("Behind");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (sett) {
            var players = list;
        } else {
            var players = Server.getAllPlayers();
        }
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(list[i])) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        };

        return ent;
    },
    avr() {
        var mod = getModule("Behind");
        var sett = getSettings(mod, "Mode", 0);
        var lock = getSettings(mod, "Lock", 0);
        var range = getSettings(mod, "Range (Nearest)", 0);
        var gap = getSettings(mod, "Gap", 0);
        if (getState(mod)) {
            if (lock) {
                if (sett == "Nearest") {
                    getCode(mod).target = getCode(mod).getNearestEntity(range);
                };
                if (getCode(mod).target != null && getCode(mod).target != -1 && getCode(getModule("EntityList")).isValid(getCode(mod).target)) {
                    var x = Entity.getX(getCode(mod).target);
                    var y = Entity.getY(getCode(mod).target);
                    var z = Entity.getZ(getCode(mod).target);
                    var yaw = Entity.getYaw(getCode(mod).target) % 360 * Math.PI / 180;
                    var pitch = Entity.getPitch(getCode(mod).target) % 180 * Math.PI / 90;
                    if (x != 0 && y != 0 && z != 0) {
                        Entity.setPosition(Player.getEntity(), (x + Math.sin(yaw) * gap), y + Math.sin(pitch) * gap, (z - Math.cos(yaw) * gap));
                        setVelY(Player.getEntity(), 0);
                    }
                }
            }
        }
    },
    attack(a, v) {

        var mod = getModule("Behind");
        var sett = getSettings(mod, "Mode", 0);
        var lock = getSettings(mod, "Lock", 0);
        var gap = getSettings(mod, "Gap", 0);
        if (getState(mod)) {
            if (a == Player.getEntity() && sett == "Pointed") {
                getCode(mod).target = v
            } else {
                getCode(mod).target = -1
            };
            if (sett == "Pointed" && !lock) {
                if (getCode(mod).target != null && getCode(mod).target != -1 && getCode(getModule("EntityList")).isValid(getCode(mod).target)) {
                    var x = Entity.getX(getCode(mod).target);
                    var y = Entity.getY(getCode(mod).target);
                    var z = Entity.getZ(getCode(mod).target);
                    var yaw = Entity.getYaw(getCode(mod).target) % 360 * Math.PI / 180;
                    var pitch = Entity.getPitch(getCode(mod).target) % 180 * Math.PI / 90;
                    Entity.setPosition(Player.getEntity(), (x + Math.sin(yaw) * gap), y + Math.sin(pitch) * gap, (z - Math.cos(yaw) * gap));
                    setVelY(Player.getEntity(), 0);
                }
            }
        }
    },
    toggle() {
        var mod = getModule("Behind");
        var sett = getSettings(mod, "Mode", 0);
        var range = getSettings(mod, "Range (Nearest)", 0);
        if (getState(mod)) {
            if (sett == "Nearest") {
                if (getCode(getModule("EntityList")).isValid(getCode(mod).getNearestEntity(range)))
                    getCode(mod).target = getCode(mod).getNearestEntity(range);
            };
        }
    }
});
associateModule("Immobile,I", [!1, !1], "Movement", 0, {
    tick() {
        var mod = getModule("Immobile");
        if (getState(mod)) {
            Entity.setImmobile(Player.getEntity(), true);
        }
    },
    toggle() {
        var mod = getModule("Immobile");
        if (getState(mod)) {
            Entity.setImmobile(Player.getEntity(), true);
        } else {
            Entity.setImmobile(Player.getEntity(), false);
        }
    }
});

associateModule("Flight,F", [!1, !1], "Movement", [{
    name: "Type",
    type: "string",
    value: "Mineplex,Creative,Crouch,Bounce,Mineplex,AirStack,Greenwix"
}, {
    name: "Velocity",
    type: "int",
    value: "1.5,0.1,5"
}], {
    timing: 10,
    isliquid: function (id) {
        var mod = getModule("Flight");
        if (id == 8 || id == 9 || id == 10 || id == 11) return true;
        return false;
    },
    onground: function () {
        var mod = getModule("Flight");
        var y = Player.getY();
        while (y > 1) y -= 1;
        if ((Math.round(y * 100) >= 61 && Math.round(y * 100) <= 63) && Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()) != 0 && !getCode(mod).isliquid(Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()))) return true;
        if ((Math.round(y * 100) >= 11 && Math.round(y * 100) <= 13) && Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()) != 0 && !getCode(mod).isliquid(Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()))) return true;
        return false;
    },
    tick() {
        var mod = getModule("Flight");
        var sett = getSettings(mod, "Type", 0);
        var speed = getSettings(mod, "Velocity", 0);
        if (getState(mod) && confirmScreenSafe()) {
            if (sett == "Creative") {
                Player.setCanFly(1);
                Player.setFlying(1);
            };
            if (sett == "Crouch") {
                if (Entity.isSneaking(Player.getEntity()) == true) {
                    let pitch = ((Entity.getPitch(Player.getEntity()) + 90) * Math.PI) / 180;
                    let yaw = ((Entity.getYaw(Player.getEntity()) + 90) * Math.PI) / 180;
                    let X = Math.sin(pitch) * Math.cos(yaw);
                    let Y = Math.cos(pitch);
                    let Z = Math.sin(pitch) * Math.sin(yaw);
                    setVelX(Player.getEntity(), X * speed);
                    setVelY(Player.getEntity(), 0.01);
                    setVelZ(Player.getEntity(), Z * speed);
                    Entity.setPositionRelative(Player.getEntity(), 0, 0.0005, 0);
                }
            };
            if (sett == "Mineplex") {
                let pitch = ((Entity.getPitch(Player.getEntity()) + 90) * Math.PI) / 180;
                let yaw = ((Entity.getYaw(Player.getEntity()) + 90) * Math.PI) / 180;
                let X = Math.sin(pitch) * Math.cos(yaw);
                let Y = Math.cos(pitch);
                let Z = Math.sin(pitch) * Math.sin(yaw);
                setVelX(Player.getEntity(), X * speed);
                setVelY(Player.getEntity(), 0);
                setVelZ(Player.getEntity(), Z * speed);
            };
            if (sett == "Bounce") {
                if (!getCode(mod).onground()) {
                    let pitch = ((Entity.getPitch(Player.getEntity()) + 90) * Math.PI) / 180;
                    let yaw = ((Entity.getYaw(Player.getEntity()) + 90) * Math.PI) / 180;
                    let X = Math.sin(pitch) * Math.cos(yaw);
                    let Y = Math.cos(pitch);
                    let Z = Math.sin(pitch) * Math.sin(yaw);
                    setVelX(Player.getEntity(), X * speed);
                    setVelZ(Player.getEntity(), Z * speed);
                    getCode(mod).timing--;
                    if (getCode(mod).timing <= 0) {
                        setVelY(Player.getEntity(), 0.35);
                        Entity.setPositionRelative(Player.getEntity(), 0, 0.0001, 0);
                        getCode(mod).timing = 10;
                    }
                }
            };
            if (sett == "AirStack") {
                Entity.setPosition(Player.getEntity(), Player.getX(), Player.getY() + 0.19, Player.getZ());
                setVelY(Player.getEntity(), -0.2)
            }
            if (sett == "Greenwix") {
                if (Entity.getVelY(Player.getEntity()) <= -0.2) {
                    setVelY(Player.getEntity(), 0.2);
                    //Entity.setPositionRelative(Player.getEntity(), 0, 0.2, 0);
                };
                let pitch = ((Entity.getPitch(Player.getEntity()) + 90) * Math.PI) / 180;
                let yaw = ((Entity.getYaw(Player.getEntity()) + 90) * Math.PI) / 180;
                let X = Math.sin(pitch) * Math.cos(yaw);
                let Y = Math.cos(pitch);
                let Z = Math.sin(pitch) * Math.sin(yaw);
                setVelX(Player.getEntity(), X * speed);
                setVelZ(Player.getEntity(), Z * speed);
            }
        }
    },
    toggle() {
        var mod = getModule("Flight");
        if (getSettings(mod, "Type", 0) == "Creative") {
            Player.setFlying(getState(mod) ? 1 : 0);
            Player.setCanFly(getState(mod) ? 1 : Level.getGameMode());
        }
        if (getState(mod) && getSettings(mod, "Type", 0) == "Mineplex") {
            Entity.setPositionRelative(Player.getEntity(), 0, 0.05, 0);
        } else {
            setVelX(Player.getEntity(), 0);
            setVelY(Player.getEntity(), -0.1);
            setVelZ(Player.getEntity(), 0);
        }
    }
});
associateModule("Speed,S", [!1, !1], "Movement", 0, {
    tick() {
        var mod = getModule("Speed");
        //var sett = getSettings(mod, "Velocity", 0);
        if (getState(mod)) {
            setVelX(Player.getEntity(), Entity.getVelX(Player.getEntity()) * 1.1);
            setVelZ(Player.getEntity(), Entity.getVelZ(Player.getEntity()) * 1.1);
        }
    }
});
associateModule("BunnyHop,BH", [!1, !1], "Movement", 0, {
    toggled: false,
    init() {
        try {
            var mod = getModule("BunnyHop");
            var state = getState(mod);
            var inst = new android.app.Instrumentation;


            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run() {
                                try {
                                    var mod = getModule("BunnyHop");
                                    var state = getState(mod);
                                    var inst = new android.app.Instrumentation;
                                    if (state && confirmScreenSafe() && !opn) {
                                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_SPACE)
                                    }

                                    new android.os.Handler().postDelayed(this, 50);
                                } catch (e) {
                                    //getCode(mod).swing();

                                    //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                    errorMessage(e + ' at #' + e.lineNumber);
                                    getCode(mod).init(); //reload
                                }
                            }
                        }), 50);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },
    toggle() {
        try {
            var mod = getModule("BunnyHop");
            if (getCode(mod).toggled == false) {
                getCode(mod).init();
                getCode(mod).toggled = true;
            }
        } catch (e) {
            errorMessage(e)
        }
    }
});
associateModule("LongJump,L", [!1, !1], "Movement", [{
    name: "Velocity",
    type: "int",
    value: "2,0.1,3"
}], {
    gui: null,
    jump() {
        var mod = getModule("LongJump");
        var sett = getSettings(mod, "Velocity", 0);
        Entity.setPositionRelative(Player.getEntity(), 0, 0.05, 0);
        setVelX(Player.getEntity(), 0);
        setVelY(Player.getEntity(), 0);
        setVelZ(Player.getEntity(), 0);
        let p = ((Entity.getPitch(Player.getEntity()) + 90) * Math.PI) / 180;
        let y = ((Entity.getYaw(Player.getEntity()) + 90) * Math.PI) / 180;
        let xx = Math.sin(p) * Math.cos(y);
        let yy = Math.sin(p) * Math.sin(y);
        let zz = Math.cos(p);
        setVelY(Player.getEntity(), +0.47);
        setVelZ(Player.getEntity(), sett * yy);
        setVelX(Player.getEntity(), sett * xx);
    },
    button() {
        var mod = getModule("LongJump");
        // if (getState(mod)) 
        uithread(() => {
            try {

                let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = 0;
                let PosY = 0;
                var moving = false;

                let btn = new android.widget.TextView(ctx);
                btn.setText(mod.name[1]);
                btn.setTextColor(-1);
                btn.setTextSize(gs(14));
                btn.setTransformationMethod(null);
                btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
                btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                btn.setBackground(style.main());
                btn.setGravity(android.view.Gravity.CENTER);
                /*btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        if (confirmScreenSafe()) getCode(mod).jump()
                    }
                }));*/
                btn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            move = true;
                            //if (!move) {
                            //return false
                            // };

                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    btn.setBackground(style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    btn.setBackground(style.main());
                                    if (!moving) {
                                        if (confirmScreenSafe()) getCode(mod).jump();
                                    };
                                    break;
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    break;
                            }
                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    //clientMessage(((motionEvent.getRawX() + dx)-PosX));
                                    if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                        //sleep(15);
                                        moving = true;
                                        PosX = (motionEvent.getRawX() + dx);
                                        PosY = (motionEvent.getRawY() + dy);
                                        getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    }
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;

                                    moving = false
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                /*btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));*/

                getCode(mod).gui = new android.widget.PopupWindow(btn, gs(dip2px(50)), gs(dip2px(50)));
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                //getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    toggle() {
        var mod = getModule("LongJump");
        if (getState(mod)) {
            getCode(mod).button();
        } else {
            getCode(mod).gui.dismiss();
        }
    }
});
associateModule("AirJump,A", [!1, !1], "Movement", [{
    name: "Velocity",
    type: "int",
    value: "0.4,0.1,1"
}], {
    gui: null,
    jump() {
        var mod = getModule("AirJump");
        var sett = getSettings(mod, "Velocity", 0);
        setVelY(Player.getEntity(), +sett);
    },
    button() {
        var mod = getModule("AirJump");
        // if (getState(mod)) 
        uithread(() => {
            try {

                let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = 0;
                let PosY = 0;
                var moving = false;

                let btn = new android.widget.TextView(ctx);
                btn.setText("J");
                btn.setTextColor(-1);
                btn.setTextSize(gs(14));
                btn.setTransformationMethod(null);
                btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
                btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                btn.setBackground(style.main());
                btn.setGravity(android.view.Gravity.CENTER);
                /*btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        if (confirmScreenSafe()) getCode(mod).jump()
                    }
                }));*/
                btn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            move = true;
                            //if (!move) {
                            //return false
                            // };

                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    btn.setBackground(style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    btn.setBackground(style.main());
                                    if (!moving) {
                                        if (confirmScreenSafe()) getCode(mod).jump();
                                    };
                                    break;
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    break;
                            }
                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    //clientMessage(((motionEvent.getRawX() + dx)-PosX));
                                    if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                        //sleep(15);
                                        moving = true;
                                        PosX = (motionEvent.getRawX() + dx);
                                        PosY = (motionEvent.getRawY() + dy);
                                        getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    }
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;

                                    moving = false
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                /*btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));*/

                getCode(mod).gui = new android.widget.PopupWindow(btn, gs(dip2px(50)), gs(dip2px(50)));
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                //getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    toggle() {
        var mod = getModule("AirJump");
        if (getState(mod)) {
            getCode(mod).button();
        } else {
            getCode(mod).gui.dismiss();
        }
    }
});
associateModule("Move,Mv", [!1, !1], "Movement", [{
    name: "Distance",
    type: "int",
    value: "5,0.1,50"
}], {
    gui: null,
    playerDir: [0, 0, 0],
    jump() {
        var mod = getModule("Move");
        var sett = getSettings(mod, "Distance", 0);
        /*var speed = parseFloat(sett);
            Entity.setCollisionSize(Player.getEntity(), 0, 0);
            toDirectionalVector(getCode(mod).playerDir, (Entity.getYaw(Player.getEntity()) + 90) * (Math.PI / 180), Entity.getPitch(Player.getEntity()) * (Math.PI / 180) * -1);
            var player = Player.getEntity();
            setPosition(Player.getEntity(), Player.getX() + (speed * getCode(mod).playerDir[0]), Player.getY() + (speed * getCode(mod).playerDir[1]), Player.getZ() + (speed * getCode(mod).playerDir[2]))

            Entity.setCollisionSize(Player.getEntity(), 0.6, 1.8);
            */
        var hit = Entity.getYaw(Player.getEntity()) + 90;
        var hitY = Entity.getPitch(Player.getEntity()) - 180;
        x = Math.cos(hit * (Math.PI / 180));
        y = Math.sin(hitY * (Math.PI / 180));
        z = Math.sin(hit * (Math.PI / 180));
        /*setVelX(Player.getEntity(), 0);
        setVelY(Player.getEntity(), 0);
        setVelZ(Player.getEntity(), 0);*/
        Entity.setPositionRelative(Player.getEntity(), x * sett, y * sett, z * sett)
        /*var mod = getModule("Move");
        var sett = getSettings(mod, "Distance", 0);
       
            var speed = parseFloat(movementTab[2].setting.split(';')[0].split(':')[1]);
            Entity.setCollisionSize(Player.getEntity(), 0, 0);
            toDirectionalVector(playerDir, (Entity.getYaw(Player.getEntity()) + 90) * (Math.PI / 180), Entity.getPitch(Player.getEntity()) * (Math.PI / 180) * -1);
            var player = Player.getEntity();
            setPosition(Player.getEntity(), Player.getX() + (speed * playerDir[0]), Player.getY() + (speed * playerDir[1]), Player.getZ() + (speed * playerDir[2]))

            Entity.setCollisionSize(Player.getEntity(), 0.6, 1.8);
        //setVelY(Player.getEntity(), +sett);*/
        /*toDirectionalVector(playerDir, (Entity.getYaw(Player.getEntity()) + 90) * Math['PI'] / 180, Entity.getPitch(Player.getEntity()) * Math['PI'] / 180 * -1);
        setVelX(Player.getEntity(), movementTab[11].setting.split(';')[0].split(':')[1] * playerDir[0]);
        setVelZ(Player.getEntity(), movementTab[11].setting.split(';')[0].split(':')[1] * playerDir[2]);
        setVelY(Player.getEntity(), 1 * playerDir[1]);*/
    },
    button() {
        var mod = getModule("Move");
        // if (getState(mod)) 
        uithread(() => {
            try {

                let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = 0;
                let PosY = 0;
                var moving = false;

                let btn = new android.widget.TextView(ctx);
                btn.setText("Move");
                btn.setTextColor(-1);
                btn.setTextSize(gs(14));
                btn.setTransformationMethod(null);
                btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
                btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                btn.setBackground(style.main());
                btn.setGravity(android.view.Gravity.CENTER);
                /*btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        if (confirmScreenSafe()) getCode(mod).jump()
                    }
                }));*/
                btn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            move = true;
                            //if (!move) {
                            //return false
                            // };

                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    btn.setBackground(style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    btn.setBackground(style.main());
                                    if (!moving) {
                                        if (confirmScreenSafe()) getCode(mod).jump();
                                    };
                                    break;
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    break;
                            }
                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    //clientMessage(((motionEvent.getRawX() + dx)-PosX));
                                    if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                        //sleep(15);
                                        moving = true;
                                        PosX = (motionEvent.getRawX() + dx);
                                        PosY = (motionEvent.getRawY() + dy);
                                        getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    }
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;

                                    moving = false
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                /*btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));*/

                getCode(mod).gui = new android.widget.PopupWindow(btn, gs(dip2px(75)), gs(dip2px(50)));
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                //getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    toggle() {
        var mod = getModule("Move");
        if (getState(mod)) {
            getCode(mod).button();
        } else {
            getCode(mod).gui.dismiss();
        }
    }
});
associateModule("Glide,G", [!1, !1], "Movement", [{
    name: "Velocity",
    type: "int",
    value: "0.1,0.1,1"
}, {
    name: "Mode",
    type: "string",
    value: "Down,Up,Down,No Y-Motion"
}], {
    tick() {
        var mod = getModule("Glide");
        var type = getSettings(mod, "Mode", 0);
        var sett = getSettings(mod, "Velocity", 0);
        if (getState(mod)) {
            if (type == "Down") setVelY(Player.getEntity(), -sett);
            if (type == "Up") setVelY(Player.getEntity(), sett);
            if (type == "No Y-Motion") setVelY(Player.getEntity(), 0);
        }
    }
});
associateModule("JetPack,Jp", [!1, !1], "Movement", [{
    name: "Velocity",
    type: "int",
    value: "1.3,0.1,15"
}], {
    tick() {
        var mod = getModule("JetPack");
        var sett = getSettings(mod, "Velocity", 0);
        if (getState(mod)) {
            var hit = Entity.getYaw(Player.getEntity()) + 90;
            var hitY = Entity.getPitch(Player.getEntity()) - 180;
            x = Math.cos(hit * (Math.PI / 180));
            y = Math.sin(hitY * (Math.PI / 180));
            z = Math.sin(hit * (Math.PI / 180));
            setVelX(Player.getEntity(), x * sett);
            setVelY(Player.getEntity(), y * sett);
            setVelZ(Player.getEntity(), z * sett);
        }
    }
});
associateModule("Scaffold,Sf", [!1, !1], "Movement", 0, {
    item(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        var mod = getModule("Scaffold");
        if (getState(mod)) {
            if (side == 2) {
                Entity.setPositionRelative(Player.getEntity(), 0, 0, -1);
            } else if (side == 3) {
                Entity.setPositionRelative(Player.getEntity(), 0, 0, 1);
            } else if (side == 4) {
                Entity.setPositionRelative(Player.getEntity(), -1, 0, 0);
            } else if (side == 5) {
                Entity.setPositionRelative(Player.getEntity(), 1, 0, 0);
            } else if (side == 1) {
                Entity.setPositionRelative(Player.getEntity(), 0, 1, 0);
            }
        }
    }
});
associateModule("Jesus,Js", [!1, !1], "Movement", 0, {
    isLiquid(id) {
        if (id == 8 || id == 9 || id == 10 || id == 11) return true;
        return false;
    },
    isInWater() {
        var mod = getModule("Jesus");
        if (getCode(mod).isLiquid(Level.getTile(Player.getX(), Player.getY() - 1.81, Player.getZ()))) return true;
        return false;
    },
    tick() {
        var mod = getModule("Jesus");
        if (getState(mod)) {
            if ((Level.getTile(Player.getX(), Player.getY() - 0.8, Player.getZ()) >= 8 && Level.getTile(Player.getX(), Player.getY() - 0.8, Player.getZ()) <= 11)) {
                setVelY(Player.getEntity(), 0.2);
            } else if ((Level.getTile(Player.getX(), Player.getY() - 1.3, Player.getZ()) >= 8 && Level.getTile(Player.getX(), Player.getY() - 1.3, Player.getZ()) <= 11)) {
                setVelY(Player.getEntity(), 0.05);
            } else if ((Level.getTile(Player.getX(), Player.getY() - 1.68, Player.getZ()) >= 8 && Level.getTile(Player.getX(), Player.getY() - 1.68, Player.getZ()) <= 11)) setVelY(Player.getEntity(), 0.015);
            if (getCode(mod).isInWater()) {
                setVelY(Player.getEntity(), 0.1);
            }
        }
    }
});
associateModule("Tower,T", [!1, !1], "Movement", 0, {
    item(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        var mod = getModule("Tower");
        if (getState(mod)) {
            setVelY(Player.getEntity(), 0.5);
        }
    }
});
associateModule("TapTp,TT", [!1, !1], "Movement", 0, {
    item(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        var mod = getModule("TapTp");
        if (getState(mod)) {
            Entity.setPosition(Player.getEntity(), x, y + 0.1, z);
        }
    }
});
associateModule("InfiniteElytra,If", [!1, !1], "Movement", 0, {
    tick() {
        var mod = getModule("InfiniteElytra");
        if (getState(mod)) {
            if (Level.getTile(Entity.getX(Player.getEntity()), Entity.getY(Player.getEntity()) - 1, Entity.getZ(Player.getEntity())) == 0) {
                if (Player.getArmorSlot(1) == 444) {
                    if (Entity.getVelX(Player.getEntity()) >= 0.5) {
                        if (Entity.getPitch(Player.getEntity()) <= -10) {
                            Entity.setPosition(Player.getEntity(), Entity.getX(Player.getEntity()) + 0.1, Entity.getY(Player.getEntity()) + 0.25, Entity.getZ(Player.getEntity()));
                            Entity.setVelX(Player.getEntity(), Entity.getVelX(Player.getEntity()) + 0.09);

                        }
                    };
                    if (Entity.getVelZ(Player.getEntity()) >= 0.5) {
                        if (Entity.getPitch(Player.getEntity()) <= -10) {
                            Entity.setPosition(Player.getEntity(), Entity.getX(Player.getEntity()), Entity.getY(Player.getEntity()) + 0.25, Entity.getZ(Player.getEntity()) + 0.1);
                            Entity.setVelZ(Player.getEntity(), Entity.getVelZ(Player.getEntity()) + 0.09);

                        }
                    };
                    if (Entity.getVelX(Player.getEntity()) <= -0.5) {
                        if (Entity.getPitch(Player.getEntity()) <= -10) {
                            Entity.setPosition(Player.getEntity(), Entity.getX(Player.getEntity()) - 0.1, Entity.getY(Player.getEntity()) + 0.25, Entity.getZ(Player.getEntity()));
                            Entity.setVelX(Player.getEntity(), Entity.getVelX(Player.getEntity()) - 0.09);

                        }
                    };
                    if (Entity.getVelZ(Player.getEntity()) <= -0.5) {
                        if (Entity.getPitch(Player.getEntity()) <= -10) {
                            Entity.setPosition(Player.getEntity(), Entity.getX(Player.getEntity()), Entity.getY(Player.getEntity()) + 0.25, Entity.getZ(Player.getEntity()) - 0.1);
                            Entity.setVelZ(Player.getEntity(), Entity.getVelZ(Player.getEntity()) - 0.09);

                        }
                    }
                }
            }
        }
    }
});
associateModule("AutoSprint,AS", [!1, !1], "Movement", 0, {
    toggled: false,
    init() {
        try {
            var mod = getModule("AutoSprint");
            var state = getState(mod);
            var inst = new android.app.Instrumentation;


            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run() {
                                try {
                                    var mod = getModule("AutoSprint");
                                    var state = getState(mod);
                                    var inst = new android.app.Instrumentation;
                                    if (state && confirmScreenSafe() && !opn && (Entity.getVelX(Player.getEntity()) != 0 || Entity.getVelZ(Player.getEntity()) != 0)) {
                                        inst.sendKeyDownUpSync(113);
                                    }

                                    new android.os.Handler().postDelayed(this, 50);
                                } catch (e) {
                                    //getCode(mod).swing();

                                    //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                    errorMessage(e + ' at #' + e.lineNumber);
                                    getCode(mod).init(); //reload
                                }
                            }
                        }), 50);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },
    toggle() {
        try {
            var mod = getModule("AutoSprint");
            if (getCode(mod).toggled == false) {
                getCode(mod).init();
                getCode(mod).toggled = true;
            }
        } catch (e) {
            errorMessage(e)
        }
    }
});

associateModule("Elevator,E", [!1, !1], "Player", [{
    name: "Level",
    type: "int",
    value: "2,1,10"
}], {
    gui: null,
    button() {
        var mod = getModule("Elevator");
        var sett = getSettings(mod, "Level", 0);
        // if (getState(mod)) 
        uithread(() => {
            try {


                let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = 0;
                let PosY = 0;
                var moving = false;

                let lay = new android.widget.LinearLayout(ctx);
                lay.setOrientation(1);
                lay.setBackground(style.main());

                let btn = new android.widget.TextView(ctx);
                btn.setText("Up");
                btn.setTextColor(-1);
                btn.setTextSize(gs(14));
                btn.setTransformationMethod(null);
                btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(75)), gs(dip2px(50))));
                //btn.setBackground(style.custom_simple("#545454"));
                btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                btn.setGravity(android.view.Gravity.CENTER);
                /*btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        if (confirmScreenSafe()) {
                            Entity.setPositionRelative(Player.getEntity(), 0, getSettings(mod, "Level", 0), 0);
                            setVelY(Player.getEntity(), 0)
                        }
                    }
                }));*/
                btn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            move = true;
                            //if (!move) {
                            //return false
                            // };

                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    btn.setBackground(style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(0), gs(0), gs(0), gs(0)]));

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    btn.setBackground(style.main());
                                    if (!moving) {
                                        if (confirmScreenSafe()) {
                                            Entity.setPositionRelative(Player.getEntity(), 0, getSettings(mod, "Level", 0), 0);
                                            setVelY(Player.getEntity(), 0)
                                        }
                                    };
                                    break;
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    break;
                            }
                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    //clientMessage(((motionEvent.getRawX() + dx)-PosX));
                                    if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                        //sleep(15);
                                        moving = true;
                                        PosX = (motionEvent.getRawX() + dx);
                                        PosY = (motionEvent.getRawY() + dy);
                                        getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    }
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;

                                    moving = false
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                /*btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));*/

                lay.addView(btn);

                //let params = new android.widget.LinearLayout.LayoutParams(gs(dip2px(75)), gs(dip2px(50)));
                //params.setMargins(0, gs(2), 0, 0);

                let params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2)));
                let line = new android.widget.LinearLayout(ctx);
                line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
                line.setLayoutParams(params);
                lay.addView(line);

                let btn1 = new android.widget.TextView(ctx);
                btn1.setText("Down");
                btn1.setTextColor(-1);
                btn1.setTextSize(gs(14));
                btn1.setTransformationMethod(null);
                btn1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(75)), gs(dip2px(50))));
                btn1.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                //btn1.setBackground(style.custom_simple("#545454"));
                btn1.setGravity(android.view.Gravity.CENTER);
                /*btn1.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        if (confirmScreenSafe()) {
                            Entity.setPositionRelative(Player.getEntity(), 0, -getSettings(mod, "Level", 0), 0);
                            setVelY(Player.getEntity(), 0)
                        }
                    }
                }));*/
                btn1.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            move = true;
                            //if (!move) {
                            //return false
                            // };

                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    btn1.setBackground(style.custom_corner("#2d2d2d", [gs(0), gs(0), gs(0), gs(0), gs(20), gs(20), gs(20), gs(20)]));

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    btn1.setBackground(style.main());
                                    if (!moving) {
                                        if (confirmScreenSafe()) {
                                            Entity.setPositionRelative(Player.getEntity(), 0, -getSettings(mod, "Level", 0), 0);
                                            setVelY(Player.getEntity(), 0)
                                        }
                                    };
                                    break;
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    break;
                            }
                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    //clientMessage(((motionEvent.getRawX() + dx)-PosX));
                                    if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                        //sleep(15);
                                        moving = true;
                                        PosX = (motionEvent.getRawX() + dx);
                                        PosY = (motionEvent.getRawY() + dy);
                                        getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    }
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;

                                    moving = false
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                /*btn1.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));*/
                lay.addView(btn1)

                getCode(mod).gui = new android.widget.PopupWindow(lay, -2, -2);
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                //getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    toggle() {
        var mod = getModule("Elevator");
        if (getState(mod)) {
            getCode(mod).button();
        } else {
            getCode(mod).gui.dismiss();
        }
    }
});
associateModule("FieldOfView,Fv", [!1, !1], "Misc", [{
    name: "Angle",
    type: "int",
    value: "90,1,180"
}], {
    tick() {
        var mod = getModule("FieldOfView");
        var sett = getSettings(mod, "Angle", 0);
        if (getState(mod)) {
            ModPE.setFov(sett);
        } else {
            ModPE.resetFov();
        }
    }
});
associateModule("Haste,He", [!1, !1], "Player", 0, {
    tick() {
        var mod = getModule("Haste");
        if (getState(mod)) {
            Entity.addEffect(Player.getEntity(), 3, 5000000, 127, true, false);
        }
    },
    toggle() {
        var mod = getModule("Haste");
        if (!getState(mod)) {
            Entity.removeEffect(Player.getEntity(), 3);
        }
    }
});
associateModule("AntiBadEffects,AB", [!1, !1], "Player", 0, {
    tick() {
        var mod = getModule("AntiBadEffects");
        if (getState(mod)) {
            Entity.removeEffect(Player.getEntity(), 2);
            Entity.removeEffect(Player.getEntity(), 4);
            Entity.removeEffect(Player.getEntity(), 7);
            Entity.removeEffect(Player.getEntity(), 9);
            Entity.removeEffect(Player.getEntity(), 15);
            Entity.removeEffect(Player.getEntity(), 17);
            Entity.removeEffect(Player.getEntity(), 18);
            Entity.removeEffect(Player.getEntity(), 19);
            Entity.removeEffect(Player.getEntity(), 20);
        }
    }
});
associateModule("Twerk,T", [!1, !1], "Player", 0, {
    toggled: false,
    init() {
        try {
            var mod = getModule("Twerk");
            var state = getState(mod);
            var inst = new android.app.Instrumentation;


            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run() {
                                try {
                                    var mod = getModule("Twerk");
                                    var state = getState(mod);
                                    var inst = new android.app.Instrumentation;
                                    if (state && confirmScreenSafe() && !opn) {
                                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_SHIFT_LEFT);
                                    }

                                    new android.os.Handler().postDelayed(this, 50);
                                } catch (e) {
                                    //getCode(mod).swing();

                                    //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                    errorMessage(e + ' at #' + e.lineNumber);
                                    getCode(mod).init(); //reload
                                }
                            }
                        }), 50);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },
    toggle() {
        try {
            var mod = getModule("Twerk");
            if (getCode(mod).toggled == false) {
                getCode(mod).init();
                getCode(mod).toggled = true;
            }
        } catch (e) {
            errorMessage(e)
        }
    }
});
associateModule("Derp,D", [!1, !1], "Player", 0, {
    tick() {
        var mod = getModule("Derp");
        if (getState(mod)) {
            Entity.setRot(Player.getEntity(), Entity.getYaw(Player.getEntity()) + 30, Entity.getPitch(Player.getEntity()));
        }
    }
});
associateModule("NoVoid,NV", [!1, !1], "Player", [{
    name: "Bypass",
    type: "bool",
    value: false
}, {
    name: "Draw Pos",
    type: "bool",
    value: false
}, {
    name: "Velocity",
    type: "int",
    value: "1,0.1,1.5"
}], {
    lastpos: [0, 0, 0],
    list: [],
    falling() {
        var velo = -1;
        if (Entity.getVelY(Player.getEntity()) <= velo) return !0;
        return !1;

    },
    isfalling() {
        var velo = -0.9;
        var arr = 0;
        for (var i = Player.getY(); i > 0; i--) {
            if (Level.getTile(Player.getX(), i, Player.getZ()) != 0) arr++;
        };
        if (Entity.getVelY(Player.getEntity()) <= velo && arr == 0) return !0;
        return !1;

    },
    save() {
        var px = Player.getX();
        var pz = Player.getZ();
        for (var i = 256.0; i > 0.0; i--) {
            if (Level.getTile(px, i, pz) != 0) {
                Entity.setPosition(Player.getEntity(), px, i + 3, pz);
                break;
            }
        }
    },
    tick() {
        var mod = getModule("NoVoid");
        var sett = getSettings(mod, "Bypass", 0);
        var sett1 = getSettings(mod, "Draw Pos", 0);
        var sett2 = getSettings(mod, "Velocity", 0);
        var notaccepted = [0, 8, 9, 10, 11, 30, 51, 53, 109];

        if (getState(mod)) {
            if (notaccepted.indexOf(Level.getTile(Math.floor(Player.getX()) + 0.5, Player.getY() - 1.8, Math.floor(Player.getZ()) + 0.5)) == -1) {
                getCode(mod).lastpos = [Math.floor(Player.getX()), Math.floor(Player.getY()), Math.floor(Player.getZ())]
                getCode(mod).list.push(getCode(mod).lastpos);
                if (getCode(mod).list.length > 1) {
                    getCode(mod).list.splice(0, 1);
                }
            }
            //let serverip = Server.getAddress();
            //if (serverip == null) {
            //    serverip = "offline"
            // }
            //if (serverip.indexOf("amazo") >= 0 || serverip == "offline") {
            //customMessage(getCode(mod).lastpos);
            if (sett1) Level.addParticle(ParticleType.happyVillager, getCode(mod).lastpos[0] + 0.5, getCode(mod).lastpos[1], getCode(mod).lastpos[2] + 0.5, 0, -0.1, 0, 5);
            if (getCode(mod).isfalling())
                if (!sett) {
                    if (Level.getTile(getCode(mod).lastpos[0] + 0.5, getCode(mod).lastpos[1] - 1, getCode(mod).lastpos[2] + 0.5) != 0 && getCode(mod).list.length > 1) {
                        Entity.setPosition(Player.getEntity(), getCode(mod).lastpos[0] + 0.5, getCode(mod).lastpos[1], getCode(mod).lastpos[2] + 0.5);
                        setVelX(Player.getEntity(), 0);
                        setVelY(Player.getEntity(), 0);
                        setVelZ(Player.getEntity(), 0);
                        notification("You have been returned.")
                    } else {
                        Entity.setPosition(Player.getEntity(), getCode(mod).list[0][0] + 0.5, getCode(mod).list[0][1], getCode(mod).list[0][2] + 0.5);
                        setVelX(Player.getEntity(), 0);
                        setVelY(Player.getEntity(), 0);
                        setVelZ(Player.getEntity(), 0);
                        notification("You have been returned.")
                    }
                    //getCode(mod).save();
                } else {
                    setVelY(Player.getEntity(), 1.2);
                }
            //  } else {
            //  setVelY(Player.getEntity(), 0.1);
        } //

    }
});
associateModule("NoWeb,NW", [!1, !1], "Player", 0, {
    toggle() {
        var mod = getModule("NoWeb");
        if (getState(mod)) {
            Block.setShape(30, 0, 0, 0, 0, 0, 0);
            Block.defineBlock(30, "Cobweb", [
                ["web", 0]
            ], 30, true, 0);
            Block.setShape(30, 0, 0, 0, 0, 0, 0);
        } else {
            Block.setShape(30, 0, 0, 0, 1, 1, 1);
            //Block.defineBlock(30, "Cobweb", [["web", 0]], 30, true, 0);
            //Block.setShape(30, 0, 0, 0, 1, 1, 1);
        }
    }
});
associateModule("ElytraSpoofer,EF", [!1, !1], "Player", 0, {
    tick() {
        var mod = getModule("ElytraSpoofer");
        if (getState(mod)) {
            Player.setArmorSlot(1, 444, 0);
        }
    }
});

associateModule("FullBright,FB", [!1, !1], "Misc", 0, {
    tick() {
        var mod = getModule("FullBright");
        if (getState(mod)) {
            Entity.addEffect(Player.getEntity(), 16, 5000000, 127, true, false);
        }
    },
    toggle() {
        var mod = getModule("FullBright");
        if (!getState(mod)) {
            Entity.removeEffect(Player.getEntity(), 16);
        }
    }
});
associateModule("ClickFriends,CF", [!1, !1], "Misc", 0, {
    list: [],
    /*initialization(){
        try {
            let path = android.os.Environment.getExternalStorageDirectory().getPath() + "Halcyon";
            //java.io.File(path).mkdirs();
            var file = new java.io.File(path, "friends.txt");
            file.createNewFile();

        }catch(e){
            errorMessage(e)
        }
    },*/
    isFriend(e) {
        var mod = getModule("ClickFriends");
        return getCode(mod).list.indexOf(e) == -1 ? false : true
    },
    attack(a, v) {
        var mod = getModule("ClickFriends");
        if (getState(mod)) {
            if (a == Player.getEntity()) {
                if (getCode(mod).list.indexOf(v) == -1) {
                    //if()
                    preventDefault();
                    getCode(mod).list.push(v);
                    customMessage(Entity.getNameTag(v) + "§r has §aadded§r to the friend list");
                    Entity.setNameTag(v, Entity.getNameTag(v) + "\n§r§a[FRIEND]");
                } else {
                    preventDefault();
                    delete getCode(mod).list[getCode(mod).list.indexOf(v)];
                    Entity.setNameTag(v, Entity.getNameTag(v).replace('\n§r§a[FRIEND]', ''));
                    customMessage(Entity.getNameTag(v) + "§r has been §cremoved§r from the friend list");
                }
            }
            //getCode(mod).list
        };
    }
});
associateModule("FastEat,FE", [!1, !1], "Player", 0, {
    on: "Item['setProperties'](0x104,{'use_duration':0x1,'food':{'nutrition':0x4,'saturation_modifier':'low','is_meat':![]}}),Item['setProperties'](0x142,{'stack_by_data':!![],'use_duration':0x1,'foil':![],'food':{'nutrition':0x4,'saturation_modifier':'supernatural','is_meat':![],'effects':[{'name':'regeneration','chance':0x1,'duration':0x5,'amplifier':0x1},{'name':'absorption','chance':0x1,'duration':0x78,'amplifier':0x0}],'enchanted_effects':[{'name':'regeneration','chance':0.66,'duration':0x1e,'amplifier':0x4},{'name':'absorption','chance':0.66,'duration':0x78,'amplifier':0x0},{'name':'resistance','chance':0.66,'duration':0x12c,'amplifier':0x0},{'name':'fire_resistance','chance':0.66,'duration':0x12c,'amplifier':0x0}]}}),Item['setProperties'](0x104,{'use_duration':0x1,'max_stack_size':0x1,'food':{'nutrition':0x6,'saturation_modifier':'normal','is_meat':![],'using_converts_to':'bowl'}}),Item['setProperties'](0x129,{'use_duration':0x1,'food':{'nutrition':0x5,'saturation_modifier':'normal','is_meat':![]}}),Item['setProperties'](0x13f,{'use_duration':0x1,'food':{'nutrition':0x3,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x140,{'use_duration':0x1,'food':{'nutrition':0x8,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x15d,{'use_duration':0x1,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x2,'saturation_modifier':'poor','is_meat':!![]}}),Item['setProperties'](0x1cc,{'use_duration':0x1,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x2,'saturation_modifier':'poor','is_meat':!![]}}),Item['setProperties'](0x1cd,{'use_duration':0x1,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x1,'saturation_modifier':'poor','is_meat':!![]}}),Item['setProperties'](0x1ce,{'use_duration':0x1,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x1,'saturation_modifier':'poor','is_meat':!![],'effects':[{'name':'poison','duration':0x3c,'amplifier':0x3},{'name':'nausea','duration':0xf,'amplifier':0x1},{'name':'hunger','duration':0xf,'amplifier':0x2}]}}),Item['setProperties'](0x15e,{'use_duration':0x1,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x5,'saturation_modifier':'normal','eat_sound':'random.burp','is_meat':!![]}}),Item['setProperties'](0x1cf,{'use_duration':0x1,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x6,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x168,{'use_duration':0x1,'food':{'nutrition':0x2,'saturation_modifier':'poor','is_meat':![]}}),Item['setProperties'](0x165,{'use_duration':0x1,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':![]}}),Item['setProperties'](0x16b,{'use_duration':0x1,'food':{'nutrition':0x3,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x16c,{'use_duration':0x1,'food':{'nutrition':0x8,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x16d,{'use_duration':0x1,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':!![],'effects':[{'name':'hunger','chance':0.3,'duration':0x1e,'amplifier':0x0}]}}),Item['setProperties'](0x16e,{'use_duration':0x1,'food':{'nutrition':0x6,'saturation_modifier':'normal','is_meat':!![]}}),Item['setProperties'](0x1a7,{'use_duration':0x1,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x1a8,{'use_duration':0x1,'food':{'nutrition':0x6,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x16f,{'use_duration':0x1,'food':{'nutrition':0x4,'saturation_modifier':'poor','is_meat':!![],'effects':[{'name':'hunger','chance':0.8,'duration':0x1e,'amplifier':0x0}]}}),Item['setProperties'](0x177,{'use_duration':0x1,'food':{'nutrition':0x2,'saturation_modifier':'good','is_meat':![],'effects':[{'name':'poison','chance':0x1,'duration':0x5,'amplifier':0x0}]}}),Item['setProperties'](0x187,{'use_duration':0x1,'food':{'nutrition':0x3,'saturation_modifier':'normal','is_meat':![]},'seed':{'crop_result':'carrots','plant_at':'farmland'}}),Item['setProperties'](0x188,{'use_duration':0x1,'food':{'nutrition':0x1,'saturation_modifier':'low','is_meat':![]},'seed':{'crop_result':'potatoes','plant_at':'farmland'}}),Item['setProperties'](0x189,{'use_duration':0x1,'food':{'nutrition':0x5,'saturation_modifier':'normal','is_meat':![]}}),Item['setProperties'](0x18a,{'use_duration':0x1,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':![],'effects':[{'name':'poison','chance':0.6,'duration':0x5,'amplifier':0x0}]}}),Item['setProperties'](0x18c,{'use_duration':0x1,'food':{'nutrition':0x6,'saturation_modifier':'supernatural','is_meat':![]}}),Item['setProperties'](0x190,{'use_duration':0x1,'food':{'nutrition':0x8,'saturation_modifier':'low','is_meat':![]}}),Item['setProperties'](0x19b,{'use_duration':0x1,'food':{'nutrition':0x3,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x19c,{'use_duration':0x1,'food':{'nutrition':0x5,'saturation_modifier':'normal','is_meat':!![]}}),Item['setProperties'](0x19d,{'use_duration':0x1,'max_stack_size':0x1,'food':{'nutrition':0xa,'saturation_modifier':'normal','using_converts_to':'bowl','is_meat':!![]}}),Item['setProperties'](0x1cb,{'use_duration':0x1,'food':{'nutrition':0x1,'saturation_modifier':'normal','is_meat':![]}}),Item['setProperties'](0x1c9,{'use_duration':0x1,'food':{'nutrition':0x1,'saturation_modifier':'normal','is_meat':![]}});",
    off: "Item['setProperties'](0x104,{'use_duration':0x20,'food':{'nutrition':0x4,'saturation_modifier':'low','is_meat':![]}}),Item['setProperties'](0x104,{'use_duration':0x20,'max_stack_size':0x1,'food':{'nutrition':0x6,'saturation_modifier':'normal','is_meat':![],'using_converts_to':'bowl'}}),Item['setProperties'](0x129,{'use_duration':0x20,'food':{'nutrition':0x5,'saturation_modifier':'normal','is_meat':![]}}),Item['setProperties'](0x13f,{'use_duration':0x20,'food':{'nutrition':0x3,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x140,{'use_duration':0x20,'food':{'nutrition':0x8,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x15d,{'use_duration':0x20,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x2,'saturation_modifier':'poor','is_meat':!![]}}),Item['setProperties'](0x1cc,{'use_duration':0x20,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x2,'saturation_modifier':'poor','is_meat':!![]}}),Item['setProperties'](0x1cd,{'use_duration':0x20,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x1,'saturation_modifier':'poor','is_meat':!![]}}),Item['setProperties'](0x1ce,{'use_duration':0x20,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x1,'saturation_modifier':'poor','is_meat':!![],'effects':[{'name':'poison','duration':0x3c,'amplifier':0x3},{'name':'nausea','duration':0xf,'amplifier':0x1},{'name':'hunger','duration':0xf,'amplifier':0x2}]}}),Item['setProperties'](0x15e,{'use_duration':0x20,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x5,'saturation_modifier':'normal','eat_sound':'random.burp','is_meat':!![]}}),Item['setProperties'](0x1cf,{'use_duration':0x20,'max_damage':0x0,'stacked_by_data':!![],'food':{'nutrition':0x6,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x168,{'use_duration':0x20,'food':{'nutrition':0x2,'saturation_modifier':'poor','is_meat':![]}}),Item['setProperties'](0x165,{'use_duration':0x20,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':![]}}),Item['setProperties'](0x16b,{'use_duration':0x20,'food':{'nutrition':0x3,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x16c,{'use_duration':0x20,'food':{'nutrition':0x8,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x16d,{'use_duration':0x20,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':!![],'effects':[{'name':'hunger','chance':0.3,'duration':0x1e,'amplifier':0x0}]}}),Item['setProperties'](0x16e,{'use_duration':0x20,'food':{'nutrition':0x6,'saturation_modifier':'normal','is_meat':!![]}}),Item['setProperties'](0x1a7,{'use_duration':0x20,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x1a8,{'use_duration':0x20,'food':{'nutrition':0x6,'saturation_modifier':'good','is_meat':!![]}}),Item['setProperties'](0x16f,{'use_duration':0x20,'food':{'nutrition':0x4,'saturation_modifier':'poor','is_meat':!![],'effects':[{'name':'hunger','chance':0.8,'duration':0x1e,'amplifier':0x0}]}}),Item['setProperties'](0x177,{'use_duration':0x20,'food':{'nutrition':0x2,'saturation_modifier':'good','is_meat':![],'effects':[{'name':'poison','chance':0x1,'duration':0x5,'amplifier':0x0}]}}),Item['setProperties'](0x187,{'use_duration':0x20,'food':{'nutrition':0x3,'saturation_modifier':'normal','is_meat':![]},'seed':{'crop_result':'carrots','plant_at':'farmland'}}),Item['setProperties'](0x188,{'use_duration':0x20,'food':{'nutrition':0x1,'saturation_modifier':'low','is_meat':![]},'seed':{'crop_result':'potatoes','plant_at':'farmland'}}),Item['setProperties'](0x189,{'use_duration':0x20,'food':{'nutrition':0x5,'saturation_modifier':'normal','is_meat':![]}}),Item['setProperties'](0x18a,{'use_duration':0x20,'food':{'nutrition':0x2,'saturation_modifier':'low','is_meat':![],'effects':[{'name':'poison','chance':0.6,'duration':0x5,'amplifier':0x0}]}}),Item['setProperties'](0x18c,{'use_duration':0x20,'food':{'nutrition':0x6,'saturation_modifier':'supernatural','is_meat':![]}}),Item['setProperties'](0x190,{'use_duration':0x20,'food':{'nutrition':0x8,'saturation_modifier':'low','is_meat':![]}}),Item['setProperties'](0x19b,{'use_duration':0x20,'food':{'nutrition':0x3,'saturation_modifier':'low','is_meat':!![]}}),Item['setProperties'](0x1c9,{'use_duration':0x20,'food':{'nutrition':0x1,'saturation_modifier':'normal','is_meat':!![]}}),Item['setProperties'](0x19c,{'use_duration':0x20,'food':{'nutrition':0x5,'saturation_modifier':'normal','is_meat':!![]}}),Item['setProperties'](0x19d,{'use_duration':0x20,'max_stack_size':0x1,'food':{'nutrition':0xa,'saturation_modifier':'normal','using_converts_to':'bowl','is_meat':!![]}}),Item['setProperties'](0x1cb,{'use_duration':0x20,'food':{'nutrition':0x1,'saturation_modifier':'normal','is_meat':![]}});",
    toggle() {
        var mod = getModule("FastEat");
        getState(mod) ? eval(getCode(mod).on) : eval(getCode(mod).off)
    }
});
associateModule("MyCollision,MC", [!1, !1], "Player", [{
    name: "X",
    type: "int",
    value: "0,0.1,10"
}, {
    name: "Y",
    type: "int",
    value: "0,0.1,10"
}], {
    toggle() {
        var mod = getModule("MyCollision");
        getState(mod) ? Entity.setCollisionSize(Player.getEntity(), getSettings(mod, "X", 0), getSettings(mod, "Y", 0)) : Entity.setCollisionSize(Player.getEntity(), 0.6, 1.8)
    }
});
associateModule("InfiniteAura,IA", [!1, !1], "Combat", [{
    name: "Range",
    type: "int",
    value: "100,1,100"
}, {
    name: "Delay",
    type: "int",
    value: "10,1,20"
}, {
    name: "From EntityList",
    type: "bool",
    value: false
}], {
    aim(ent) {
        if (ent != null || ent != -1) {
            var x = Entity.getX(ent) - Player.getX();
            var y = Entity.getY(ent) - Player.getY()
            var z = Entity.getZ(ent) - Player.getZ();

            if (Entity.getEntityTypeId(ent) != 63) y += 0.5;
            var a = 0.5 + Entity.getX(ent);
            var b = Entity.getY(ent);
            var c = 0.5 + Entity.getZ(ent);
            var len = Math.sqrt(x * x + y * y + z * z);
            var y = y / len;
            var pitch = Math.asin(y);
            pitch = pitch * 180.0 / Math.PI;
            pitch = -pitch;
            var yaw = -Math.atan2(a - (Player.getX() + 0.5), c - (Player.getZ() + 0.5)) * (180 / Math.PI);
            if (pitch < 89 && pitch > -89) {
                Entity.setRot(Player.getEntity(), yaw, pitch);
            }
        }
    },
    swing() {
        try {
            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        //android.os.Looper.prepare();
                        var inst = new android.app.Instrumentation;
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                        //android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        } catch (e) {
            errorMessage(e)
        }
    },
    getNearestEntity(range) {
        var mod = getModule("InfiniteAura");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (sett) {
            var players = list;
        } else {
            var players = Server.getAllPlayers();
        }
        var small = range;
        var ent = null;
        for (var i = 0; i < players.length; i++) {
            if (!getCode(getModule("ClickFriends")).isFriend(list[i])) {
                var x = Entity.getX(players[i]) - Player.getX();
                var y = Entity.getY(players[i]) - Player.getY();
                var z = Entity.getZ(players[i]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
            }
        };
        /*players.forEach((e)=>{
            //if (getCode(getModule("ClickFriends")).isFriend(e) == false) {
                var x = Entity.getX(players[e]) - Player.getX();
                var y = Entity.getY(players[e]) - Player.getY();
                var z = Entity.getZ(players[e]) - Player.getZ();
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (dist < small && dist > 0 && Entity.getHealth(players[e]) >= 1) {
                    small = dist;
                    ent = players[i];
                }
           // }
        })*/

        return ent;
    },
    lastpos: [0, 0, 0],
    oldrot: [0, 0],
    timing: 5,
    st: 0,
    tick() {
        try {
            /*var mod = getModule("InfiniteAura");
            var sett = getSettings(mod, "Range", 0);
            var delay = getSettings(mod, "Delay", 0);
            var ent = getCode(mod).getNearestEntity(sett);
            if (getState(mod) && ent != -1) {

                if (Entity.getX(ent) != 0 && Entity.getY(ent) != 0 && Entity.getZ(ent) != 0) {
                    getCode(mod).timing--;
                    //getCode(mod).timing = 15
                    if (getCode(mod).timing == 2) {
                        getCode(mod).lastpos[0] = Player.getX();
                        getCode(mod).lastpos[1] = Player.getY();
                        getCode(mod).lastpos[2] = Player.getZ();
                        //getCode(mod).aim(ent);
                        //getCode(mod).oldrot[0] = Entity.getYaw(Player.getEntity());
                        //getCode(mod).oldrot[1] = Entity.getPitch(Player.getEntity());
                        var x = Entity.getX(ent);
                        var y = Entity.getY(ent) + 3;
                        var z = Entity.getZ(ent);
                        setVelY(Player.getEntity(), -0.1);
                        Entity.setCollisionSize(ent, 10, 10);
                        Entity.setPosition(Player.getEntity(), x, y, z);
                    };
                    if (getCode(mod).timing == 1) {
                        getCode(mod).aim(ent)
                        getCode(mod).swing();
                    }
                    if (getCode(mod).timing == 0) {
                        //Entity.setCollisionSize(getCode(mod).getNearestEntity(sett), 0.8, 1.8);
                        Entity.setPosition(Player.getEntity(), getCode(mod).lastpos[0], getCode(mod).lastpos[1], getCode(mod).lastpos[2]);
                        setVelY(Player.getEntity(), -0.1);
                        //getCode(mod).st == 1 ? setVelX(Player.getEntity(), 0.1) : 
                        //getCode(mod).st == 1 ? getCode(mod).st = 0 : getCode(mod).st++;
                        if(getCode(mod).st == 1){
                            getCode(mod).st = 0;
                            setVelX(Player.getEntity(), 0.1);
                        }else{
                            getCode(mod).st++;
                            setVelX(Player.getEntity(), -0.1);
                        }
                        getCode(mod).aim(ent);
                        //Entity.setRot(Player.getEntity(), getCode(mod).oldrot[0], getCode(mod).oldrot[1]);
                        getCode(mod).timing = delay
                    }
                }
            }*/
            var mod = getModule("InfiniteAura");
            var sett = getSettings(mod, "Range", 0);
            var delay = getSettings(mod, "Delay", 0);
            var ent = getCode(mod).getNearestEntity(sett);
            if (getState(mod) && ent != -1 && !opn) {
                if (getCode(getModule("EntityList")).isValid(ent)) {
                    getCode(mod).timing--;
                    //getCode(mod).timing = 15
                    if (getCode(mod).timing == 1) {
                        //getCode(mod).lastpos[0] = Player.getX();
                        //getCode(mod).lastpos[1] = Player.getY();
                        //getCode(mod).lastpos[2] = Player.getZ();
                        //getCode(mod).aim(ent);
                        //getCode(mod).oldrot[0] = Entity.getYaw(Player.getEntity());
                        //getCode(mod).oldrot[1] = Entity.getPitch(Player.getEntity());
                        var x = Entity.getX(ent);
                        var y = Entity.getY(ent) + 1;
                        var z = Entity.getZ(ent);
                        setVelY(Player.getEntity(), -0.1);
                        Entity.setCollisionSize(ent, 10, 10);
                        Entity.setPosition(Player.getEntity(), x, y, z);
                        getCode(mod).aim(ent)
                        getCode(mod).swing();
                    };
                    if (getCode(mod).timing == 0) {
                        //Entity.setCollisionSize(getCode(mod).getNearestEntity(sett), 0.8, 1.8);
                        Entity.setPosition(Player.getEntity(), getCode(mod).lastpos[0], getCode(mod).lastpos[1], getCode(mod).lastpos[2]);
                        setVelY(Player.getEntity(), -0.1);
                        //getCode(mod).st == 1 ? setVelX(Player.getEntity(), 0.1) : 
                        //getCode(mod).st == 1 ? getCode(mod).st = 0 : getCode(mod).st++;
                        if (getCode(mod).st == 1) {
                            getCode(mod).st = 0;
                            setVelX(Player.getEntity(), 0.1);
                        } else {
                            getCode(mod).st++;
                            setVelX(Player.getEntity(), -0.1);
                        }
                        getCode(mod).aim(ent);
                        //Entity.setRot(Player.getEntity(), getCode(mod).oldrot[0], getCode(mod).oldrot[1]);
                        getCode(mod).timing = delay
                    }
                }
            }
        } catch (e) {
            errorMessage(e)
        }
    },
    toggle() {
        var mod = getModule("InfiniteAura");
        getCode(mod).lastpos[0] = Player.getX();
        getCode(mod).lastpos[1] = Player.getY();
        getCode(mod).lastpos[2] = Player.getZ();
    }
});
associateModule("EntityList,EL", [!1, !1], "Misc", [{
    name: "Maximal Range",
    type: "int",
    value: "100000,10000,1000000"
}, {
    name: "Minimal Range",
    type: "int",
    value: "0,10000,1000000"
}, {
    name: "Mode",
    type: "string",
    value: "Only +,Only +,Only -,All"
}, {
    name: "Check ID",
    type: "bool",
    value: false
}, {
    name: "Output",
    type: "bool",
    value: false
}], {
    list: [],
    fakelist: [],
    isValid(ent) {
        if (Entity.getX(ent) != 0 && Entity.getY(ent) != 0 && Entity.getZ(ent) != 0) {
            return true
        } else {
            return false
        }
    },
    scan() {
        var t = (new Date()).getTime();
        var hostThread = new java.lang.Thread(new java.lang.Runnable({
            run() {
                try {
                    android.os.Looper.prepare();

                    var mod = getModule("EntityList");

                    getCode(mod).fakelist = new Array();
                    //getCode(getModule("EntityList")isValid(e);

                    var sett = getSettings(mod, "Mode", 0);
                    var output = getSettings(mod, "Output", 0);
                    var min = parseFloat(getSettings(mod, "Minimal Range", 0)) + 1;
                    var max = parseFloat(getSettings(mod, "Maximal Range", 0)) + 1;
                    if (max > min) {
                        if (sett == "All") {
                            for (var i = -max; i < min; i++) {
                                try {
                                    if (confirmGameScreen())
                                        if ( /*Player.isPlayer(i) == true*/ Entity.getEntityTypeId(i) == 63) {
                                            if (i != Player.getEntity()) getCode(mod).fakelist.push(i);
                                        }
                                } catch (e) {
                                    errorMessage(e);
                                    break;
                                }
                            };
                            //var t = (new Date()).getTime();
                            for (var i = min; i <= max; i++) {
                                try {

                                    if (confirmGameScreen())
                                        if (Entity.getEntityTypeId(i) == 63) {
                                            if (i != Player.getEntity()) getCode(mod).fakelist.push(i);
                                        }
                                } catch (e) {
                                    errorMessage(e);
                                    break;
                                }
                            }
                        };
                        if (sett == "Only +") {
                            // var t = (new Date()).getTime();
                            for (var i = min; i <= max; i++) {
                                try {
                                    if (confirmGameScreen())
                                        if (Entity.getEntityTypeId(i) == 63) {
                                            if (i != Player.getEntity()) getCode(mod).fakelist.push(i);
                                        }
                                } catch (e) {
                                    errorMessage(e);
                                    break;
                                }
                            }
                        };
                        if (sett == "Only -") {
                            // var t = (new Date()).getTime();
                            for (var i = -max; i < min; i++) {
                                try {
                                    if (confirmGameScreen())
                                        if (Entity.getEntityTypeId(i) == 63) {
                                            if (i != Player.getEntity()) getCode(mod).fakelist.push(i);
                                        }
                                } catch (e) {
                                    errorMessage(e);
                                    break;
                                }
                            };
                        };

                        var t1 = (new Date()).getTime();
                        if (output)
                            customMessage("Scanned for " + (t1 - t) + "ms");

                        function uniq_fast(a) {
                            var seen = {};
                            var out = [];
                            var len = a.length;
                            var j = 0;
                            for (var i = 0; i < len; i++) {
                                var item = a[i];
                                if (seen[item] !== 1) {
                                    seen[item] = 1;
                                    out[j++] = item;
                                }
                            }
                            return out;
                        }
                        uniq_fast(getModule("EntityList").code.fakelist)
                        getModule("EntityList").code.list = getModule("EntityList").code.fakelist;
                        if (output) customMessage(getCode(mod).list.length + " players founded!");
                        getCode(mod).started = false;
                        sleep(1500);
                        if (getState(mod)) {
                            getCode(mod).started = true;
                            getCode(mod).scan();
                            if (output) customMessage("Scan restarted");
                        }
                    }
                    /*for (var i = -1000000; i < 1000000; i++) {
                        if (Player.isPlayer(i) == true && i != Player.getEntity()) {
                            getCode(mod).list.push(i);
                        }
                    };*/
                    android.os.Looper.loop();
                } catch (e) {
                    errorMessage(e)
                }

            }
        }))
        hostThread.start();
    },
    started: false,
    button() { //getCode(getModule("EntityList")isValid(e);
        var mod = getModule("EntityList");
        // if (getState(mod)) 
        uithread(() => {
            try {

                let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = 0;
                let PosY = 0;

                let btn = new android.widget.TextView(ctx);
                btn.setText("Scan");
                btn.setTextColor(-1);
                btn.setTextSize(gs(14));
                btn.setTransformationMethod(null);
                btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
                btn.setBackground(style.custom_simple("#545454"));
                btn.setGravity(android.view.Gravity.CENTER);
                btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        if (confirmGameScreen()) {
                            if (!getCode(mod).started) {
                                getCode(mod).started = true;
                                btn.setTextColor(android.graphics.Color.GREEN);
                                customMessage("Scan started");
                                getCode(mod).scan();
                                //getCode(mod).gui.dismiss();
                                btn.setTextColor(-1);
                            } else {
                                customMessage("Scan already started!");
                            }
                        }
                    }
                }));
                btn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    PosX = (motionEvent.getRawX() + dx);
                                    PosY = (motionEvent.getRawY() + dy);
                                    getCode(mod).gui.update(PosX, PosY, -1, -1);
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));

                getCode(mod).gui = new android.widget.PopupWindow(btn, gs(dip2px(75)), gs(dip2px(50)));
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    attack(a, v) {
        var mod = getModule("EntityList");
        var sett = getSettings(mod, "Check ID", 0);
        if (sett && getState(mod)) {
            //preventDefault();
            customMessage(v + " - " + Entity.getEntityTypeId(v))
        }
    },
    toggle() {
        var mod = getModule("EntityList");
        if (getState(mod) && confirmGameScreen() && !getSettings(mod, "Check ID", 0)) {
            if (!getCode(mod).started) {
                getCode(mod).scan();
            } else {
                if (Halcyon.isDev) customMessage("Scan already started!");
            }
        }
    }
});
associateModule("ESP,E", [!1, !1], "Misc", [{
    name: "From EntityList",
    type: "bool",
    value: false
}, {
    name: "Type",
    type: "string",
    value: "3D,3D"
}], {
    render(gl) {
        var mod = getModule("ESP");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (getState(mod)) {
            let px = Player.getX();
            let py = Player.getY();
            let pz = Player.getZ();
            if (sett) {
                var players = list;
            } else {
                var players = Server.getAllPlayers();
            }
            players.forEach(function (entry) {
                let x = Entity.getX(entry) - px;
                let y = Entity.getY(entry) - py;
                let z = Entity.getZ(entry) - pz;
                let dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (entry != Player.getEntity() && Entity.getEntityTypeId(entry) == 63 && getCode(getModule("EntityList")).isValid(entry)) {
                    Render.drawBox(gl, Entity.getX(entry) - 0.5, Entity.getY(entry) - 0.5, Entity.getZ(entry) - 0.5, 0.9, 1.85, 0.9, getCode(getModule("ClickFriends")).isFriend(entry));
                }
            })
        }
    },
    toggle() {
        if (!Render.initted && !Render_tracers.initted) {
            Render.init();
        }
    }
});
associateModule("TraceLines,TL", [!1, !1], "Misc", [{
    name: "From EntityList",
    type: "bool",
    value: false
}, {
    name: "Drawing FOV",
    type: "int",
    value: "90,1,180"
}], {
    render(gl) {
        var mod = getModule("TraceLines");
        var sett = getSettings(mod, "From EntityList", 0);
        var list = getCode(getModule("EntityList")).list;
        if (getState(mod)) {
            let px = Player.getX();
            let py = Player.getY() + 1;
            let pz = Player.getZ();
            if (sett) {
                var players = list;
            } else {
                var players = Server.getAllPlayers();
            }
            players.forEach(function (entry) {
                let x = Entity.getX(entry) - px;
                let y = Entity.getY(entry) - py;
                let z = Entity.getZ(entry) - pz;
                let dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                if (entry != Player.getEntity() && Entity.getEntityTypeId(entry) == 63 && getCode(getModule("EntityList")).isValid(entry)) {
                    //Render.drawBox(gl, Entity.getX(entry) - 0.5, Entity.getY(entry) - 0.5, Entity.getZ(entry) - 0.5, 0.9, 1.85, 0.9, getCode(getModule("ClickFriends")).isFriend(entry));
                    Render_tracers.Render.drawLine(gl, Entity.getX(entry) - 0.5, Entity.getY(entry) - 0.5, Entity.getZ(entry) - 0.5, Player.getX(), Player.getY() + 1, Player.getZ(), getCode(getModule("ClickFriends")).isFriend(entry));
                    //Player.getX(), Player.getY()- 100, Player.getZ()
                }
            })
        }
    },
    toggle() {
        if (!Render_tracers.Render.initted) {
            Render_tracers.Render.init();
        }
    }
});
associateModule("FakeCam,FC", [!1, !1], "Misc", 0, {
    lastYaw: 0,
    lastPitch: 0,
    lastPos: [0, 0, 0],
    fakeEnt: -1,
    rotate() {
        var mod = getModule("FakeCam");
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();

        setVelY(getCode(mod).fakeEnt, 0);
        //Entity.setPosition(getCode(mod).fakeEnt, (x + Math.sin(yaw) * 4), y + Math.sin(pitch) * 2, (z - Math.cos(yaw) * 4));
        //getCode(mod).lastpos = [(x + Math.sin(yaw) * 4), y + Math.sin(pitch) * 2, (z - Math.cos(yaw) * 4)];
        if (!getCode(getModule("AimBot")).rotating) {
            getCode(mod).lastYaw = Entity.getYaw(Player.getEntity()) % 360 * Math.PI / 180;
            getCode(mod).lastPitch = Entity.getPitch(Player.getEntity()) % 180 * Math.PI / 90;

        }
        getCode(mod).lastpos = [(x + Math.sin(getCode(mod).lastYaw) * 4), y - 1.5, (z - Math.cos(getCode(mod).lastYaw) * 4)]
        Entity.setPosition(getCode(mod).fakeEnt, getCode(mod).lastpos[0], getCode(mod).lastpos[1], getCode(mod).lastpos[2]);
        //clientMessage(getCode(mod).lastpos + " "  +x + ':' + y + ":" + z)
    },
    /*aim() {
        var mod = getModule("FakeCam");
        if (getCode(mod).fakeEnt != -1) {
            var x = Player.getX() - Entity.getX(getCode(mod).fakeEnt);
            var y = Player.getY()- Entity.getY(getCode(mod).fakeEnt);
            var z = Player.getZ() - Entity.getZ(getCode(mod).fakeEnt);


            var a = 0.5 + Player.getX();
            var b = Player.getY();
            var c = 0.5 + Player.getZ();
            var len = Math.sqrt(x * x + y * y + z * z);
            var y = y / len;
            var pitch = Math.asin(y);
            pitch = pitch * 180.0 / Math.PI;
            pitch = -pitch;
            var yaw = -Math.atan2(a - (Entity.getX(getCode(mod).fakeEnt) + 0.5), c - (Entity.getZ(getCode(mod).fakeEnt) + 0.5)) * (180 / Math.PI);
            if (pitch < 89 && pitch > -89) {
                Entity.setRot(getCode(mod).fakeEnt, yaw, 0);
            }
        }
    },*/
    aim() {
        var mod = getModule("FakeCam");
        /*var x = Player.getX() - getCode(mod).lastpos[0];
        var y = Player.getY()- 2 - getCode(mod).lastpos[1];
        var z = Player.getZ() - getCode(mod).lastpos[2];

        var a = 0.5 + Player.getX();
        var b = Player.getY();
        var c = 0.5 + Player.getZ();
        var len = Math.sqrt(x * x + y * y + z * z);
        var y = y / len;
        var pitch = Math.asin(y);
        pitch = pitch * 180.0 / Math.PI;
        pitch = -pitch;
        var yaw = -Math.atan2(a - (getCode(mod).lastpos[0] + 0.5), c - (getCode(mod).lastpos[2] + 0.5)) * (180 / Math.PI);*/
        Entity.setRot(getCode(mod).fakeEnt, 180, 0);
        //;
        // Entity.setRot(getCode(mod).fakeEnt, Entity.getYaw(Player.getEntity()) / 2,Entity.getPitch(Player.getEntity()));

    },
    avr() {
        var mod = getModule("FakeCam");
        if (getState(mod) && confirmScreenSafe()) {
            if (getCode(mod).fakeEnt != -1) {
                ModPE.setCamera(getCode(mod).fakeEnt);
                getCode(mod).rotate();
                getCode(mod).aim();
            } else {
                var x = Player.getX();
                var y = Player.getY();
                var z = Player.getZ();
                var yaw = Entity.getYaw(Player.getEntity()) % 360 * Math.PI / 180;
                getCode(mod).fakeEnt = spawnCow(getCode(mod).lastpos[0], getCode(mod).lastpos[1], getCode(mod).lastpos[2], null);
                //Entity.setImmobile(getCode(mod).fakeEnt, true);
                Entity.setCollisionSize(getCode(mod).fakeEnt, 0, 0);
                //Entity.setRenderType(getCode(mod).fakeEnt, EntityRenderType.human);
                ModPE.setCamera(getCode(mod).fakeEnt);
                getCode(mod).rotate();
                getCode(mod).aim();
                /* if(!getCode(getModule("AimBot")).rotating){
                    Entity.setRot(getCode(mod).fakeEnt, Entity.getYaw(Player.getEntity()), 0);
                    getCode(mod).lastYaw = Entity.getYaw(Player.getEntity())
                    }else{
                        Entity.setRot(getCode(mod).fakeEnt, getCode(mod).lastYaw, 0);
                    }*/
                //Entity.setImmobile(getCode(mod).fakeEnt, false);

            }
            /* if(!getCode(getModule("AimBot")).rotating){
                Entity.setRot(getCode(mod).fakeEnt, Entity.getYaw(Player.getEntity()), 0);
                getCode(mod).lastYaw = Entity.getYaw(Player.getEntity())
                }else{
                    Entity.setRot(getCode(mod).fakeEnt, getCode(mod).lastYaw, 0);
                }*/
            //getCode(mod).aim();
        }
    },
    toggle() {
        var mod = getModule("FakeCam");
        if (getState(mod)) {
            var x = Player.getX();
            var y = Player.getY();
            var z = Player.getZ();
            var yaw = Entity.getYaw(Player.getEntity()) % 360 * Math.PI / 180;
            getCode(mod).fakeEnt = spawnCow(Player.getX() + 3, Player.getY() + 1, Player.getZ(), null);

            Entity.setCollisionSize(getCode(mod).fakeEnt, 0, 0);
            Entity.setRenderType(getCode(mod).fakeEnt, EntityRenderType.human);
            ModPE.setCamera(getCode(mod).fakeEnt);
            getCode(mod).rotate();
            getCode(mod).aim();
            /* if(!getCode(getModule("AimBot")).rotating){
                Entity.setRot(getCode(mod).fakeEnt, Entity.getYaw(Player.getEntity()), 0);
                getCode(mod).lastYaw = Entity.getYaw(Player.getEntity())
                }else{
                    Entity.setRot(getCode(mod).fakeEnt, getCode(mod).lastYaw, 0);
                }*/
            //Entity.setImmobile(getCode(mod).fakeEnt, true);


        } else {
            ModPE.setCamera(Player.getEntity());
            Entity.remove(getCode(mod).fakeEnt)
            getCode(mod).fakeEnt = -1;
        }
    }
});
associateModule("Ambience,A", [!1, !1], "Misc", [{
    name: "Time",
    type: "int",
    value: "1000,100,24000"
}, {
    name: "Mode",
    type: "string",
    value: "DayCycle,DayCycle,Static"
}, {
    name: "Delay",
    type: "int",
    value: "20,1,40"
}], {
    ticked: 0,
    avr() {
        var mod = getModule("Ambience");
        var sett = getSettings(mod, "Mode", 0);
        var time = getSettings(mod, "Time", 0);
        var delay = parseFloat(getSettings(mod, "Delay", 0));
        if (getState(mod)) {
            if (sett == "DayCycle") {
                //Level.setTime(getCode(mod).ticked);
                getCode(mod).ticked = parseFloat(getCode(mod).ticked) + parseFloat(delay);

                //clientMessage(getCode(mod).ticked);
                Level.setTime(getCode(mod).ticked);
            } else {
                Level.setTime(time);
            }
        }
    }
});
associateModule("Notifications,N", [!0, !1], "Misc", [{
    name: "Show time",
    type: "int",
    value: "20,1,100"
}], {});
associateModule("Crasher,Cr", [!1, !1], "Misc", 0, {
    rand(max) {
        return ((Math.random() * max) << 0)
    },
    tof() {
        return 1 == ((Math.random() * 2) << 0) ? true : false
    },
    tick() {
        var mod = getModule("Crasher");
        if (getState(mod)) {
            Entity.setPosition(Player.getEntity(), getCode(mod).rand(100000), 80, getCode(mod).rand(100000));
        }
    }
});
associateModule("X-Ray,X", [!1, !1], "Misc", 0, {
    tick() {
        var mod = getModule("X-Ray");
        if (getState(mod)) {
            setVelX(Player.getEntity(), 0);
            setVelY(Player.getEntity(), 0);
            setVelZ(Player.getEntity(), 0);
        }
    },
    toggle() {
        Entity.setImmobile(Player.getEntity(), false);
        var mod = getModule("X-Ray");
        if (confirmGameScreen())
            if (getState(mod)) {
                Entity.setImmobile(Player.getEntity(), true);
                // for(var i = 1; i<256; i++)
                Block.setRenderLayer(1, 1);
                Block.setRenderLayer(2, 1);
                Block.setRenderLayer(3, 1);
                Block.setRenderLayer(87, 1);
                Block.setShape(1, 0.00000, 0.00000, 0.00000, 0, 0, 0);
                Block.setShape(2, 0.00000, 0.00000, 0.00000, 0, 0, 0);
                Block.setShape(3, 0.00000, 0.00000, 0.00000, 0, 0, 0);
                Block.setLightLevel(16, 15);
                Block.setLightLevel(15, 15);
                Block.setLightLevel(56, 15);
                Block.setLightLevel(21, 15);
                Block.setLightLevel(73, 15);
                Block.setLightLevel(129, 15);
                Block.setLightLevel(153, 15);
            } else {
                Entity.setImmobile(Player.getEntity(), false);
                Block.setRenderLayer(1, 0);
                Block.setRenderLayer(2, 0);
                Block.setRenderLayer(3, 0);
                Block.setRenderLayer(87, 0);
                Block.setLightLevel(16, 0);
                Block.setLightLevel(15, 0);
                Block.setLightLevel(56, 0);
                Block.setLightLevel(21, 0);
                Block.setLightLevel(73, 0);
                Block.setLightLevel(129, 0);
                Block.setLightLevel(153, 0);
                Block.setShape(1, 0.00000, 0.00000, 0.00000, 1, 1, 1);
                Block.setShape(2, 0.00000, 0.00000, 0.00000, 1, 1, 1);
                Block.setShape(3, 0.00000, 0.00000, 0.00000, 1, 1, 1);
            }
    }
});
associateModule("PingMeter,PM", [!1, !1], "Misc", [{
    name: "Update time",
    type: "int",
    value: "20,1,40"
}], {
    ticked: 0,
    ping: 0,
    btn: new android.widget.TextView(ctx),
    gui: null,
    checkip(ip) {
        var mod = getModule("PingMeter");
        var hostThread = new java.lang.Thread(new java.lang.Runnable({
            run() {
                //android.os.Looper.prepare();
                try {
                    var ipAd = ip;
                    var inet = java.net.InetAddress.getByName(ipAd);
                    //if (Halcyon.isDev) customMessage("Sending Ping Request to " + ipAd);
                    var finish = 0;
                    var start = new java.util.GregorianCalendar().getTimeInMillis();
                    if (inet.isReachable(5000)) {
                        finish = new java.util.GregorianCalendar().getTimeInMillis();
                        // if (Halcyon.isDev) customMessage("Ping RTT: " + (finish - start + "ms"));
                        getCode(mod).ping = (finish - start);
                    } else {
                        getCode(mod).ping = -1;
                        // if (Halcyon.isDev) customMessage(ipAd + " NOT reachable.");
                    }
                } catch (e) {
                    if (Halcyon.isDev) customMessage(e);
                }
                //android.os.Looper.loop();

            }
        }))
        hostThread.start();
    },
    button() {
        var mod = getModule("PingMeter");
        // if (getState(mod)) 
        uithread(() => {
            try {

                getCode(mod).btn.setText("Ping: " + getCode(mod).ping);
                getCode(mod).btn.setTextColor(android.graphics.Color.WHITE);
                getCode(mod).btn.setTextSize(gs(17));
                getCode(mod).btn.setGravity(android.view.Gravity.RIGHT);
                getCode(mod).btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                getCode(mod).btn.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);

                getCode(mod).gui = new android.widget.PopupWindow(getCode(mod).btn, -2, -2);
                getCode(mod).gui.setTouchable(!!0);
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 15, 5);
                getCode(mod).gui.setTouchable(!!0);

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    tick() {
        var mod = getModule("PingMeter");
        var sett = getSettings(mod, "Update time", 0);
        if (getState(mod)) {
            if (getCode(mod).ticked <= 0) {
                getCode(mod).checkip(Server.getAddress());
                getCode(mod).ticked = sett
            } else {
                getCode(mod).ticked--; ///clientMessage(getCode(mod).ticked)
            }
            uithread(() => {
                try {
                    if (getCode(mod).gui != null) {
                        /*if (getCode(mod).ping > -1 && getCode(mod).ping < 100)
                        getCode(mod).btn.setText(fromHtml("Ping: " + getCode(mod).ping))
                        else if (getCode(mod).ping >= 100)
                        getCode(mod).btn.setText(fromHtml("Ping: <font color='yellow'>" + getCode(mod).ping + "</font>"))
                        else getCode(mod).btn.setText(fromHtml('<font color="' + maincolor + '">Server is unreachable</font>'))*/
                        getCode(mod).btn.setText(fromHtml("Ping: " + getCode(mod).ping))
                    }
                } catch (e) {
                    errorMessage(e)
                }
            })
        }
    },
    toggle() {
        var mod = getModule("PingMeter");
        if (getState(mod)) {
            getCode(mod).button();
        } else {
            if (getCode(mod).gui != null)
                if (getCode(mod).gui.isShowing()) getCode(mod).gui.dismiss()
        }
    }
});
associateModule("Coordinates,Cr", [!1, !1], "Misc", 0, {
    ticked: 0,
    ping: 0,
    btn: new android.widget.TextView(ctx),
    gui: null,
    button() {
        var mod = getModule("Coordinates");
        // if (getState(mod)) 
        uithread(() => {
            try {

                getCode(mod).btn.setText(android.text.Html.fromHtml('<font color="red">X:</font> ' + Math.round(Player.getX()) + " <font color='red'>Y:</font> " + Math.round(Player.getY()) + " <font color='red'>Z:</font> " + Math.round(Player.getZ())));
                getCode(mod).btn.setTextColor(android.graphics.Color.WHITE);
                getCode(mod).btn.setTextSize(gs(17));
                getCode(mod).btn.setGravity(android.view.Gravity.RIGHT);
                getCode(mod).btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                getCode(mod).btn.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);

                getCode(mod).gui = new android.widget.PopupWindow(getCode(mod).btn, -2, -2);
                getCode(mod).gui.setTouchable(!!0);
                getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.BOTTOM, 15, 5);
                getCode(mod).gui.setTouchable(!!0);
                //getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

            } catch (e) {
                errorMessage(e)
            }
        })
    },
    tick() {
        var mod = getModule("Coordinates");
        if (getState(mod)) {
            uithread(() => {
                try {
                    if (getCode(mod).gui != null) {
                        getCode(mod).btn.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">X:</font> ' + Math.round(Player.getX()) + ' <font color="' + maincolor + '">Y:</font> ' + Math.round(Player.getY()) + ' <font color="' + maincolor + '">Z:</font> ' + Math.round(Player.getZ())));
                    }
                } catch (e) {
                    errorMessage(e)
                }
            })
        }
    },
    toggle() {
        var mod = getModule("Coordinates");
        if (getState(mod)) {
            getCode(mod).button();
        } else {
            if (getCode(mod).gui != null)
                if (getCode(mod).gui.isShowing()) getCode(mod).gui.dismiss()
        }
    }
});
associateModule("Spammer,Sp", [!1, !1], "Misc", [{
    name: "Delay",
    type: "int",
    value: "0,1,100"
}], {
    ticked: 0,
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    tick() {
        var mod = getModule("Spammer");
        if (getState(mod)) {
            if (getCode(mod).ticked <= 0) {
                Server.sendChat("! - Halcyon - the best mcpe hacked client! " + getCode(mod).random(-999, 999));
                getCode(mod).ticked = getSettings(mod, "Delay", 0)
            } else {
                getCode(mod).ticked--;
            }
        }
    }
});

if (Halcyon.isDev) {
    /*associateModule("HackerDetector,HD", [!1, !1], "Player", [{
        name: "From EntityList",
        type: "bool",
        value: true
    }], {
        vl: [],
        tick() {
            var mod = getModule("HackerDetector");
            var sett = getSettings(mod, "From EntityList", 0);
            var list = getCode(getModule("EntityList")).list;
            
            if (getState(mod)) {
                for (var i = 0; i < list.length; i++) {
                    if (!getCode(getModule("ClickFriends")).isFriend(list[i])) {
                        var x = Entity.getX(list[i])
                        var y = Entity.getY(list[i])
                        var z = Entity.getZ(list[i])
                        
                        if(Entity.getVelX(list[i]) > 1 || Entity.getVelZ(list[i]) > 1 ||Entity.getVelX(list[i]) < -1 || Entity.getVelZ(list[i]) < -1) notification(Entity.getNameTag(list[i]) + " is potential hacker!")
                    }
                };
            }
        }
    });*/
    associateModule("ESP2D,2D", [!1, !1], "Misc", [{
        name: "Render Time",
        type: "int",
        value: "1,1,50"
    }], {
        DrawList: [],
        popup: null,
        lay: null,
        btn: null,
        target: -1,
        initted: false,
        upd() {
            var mod = getModule("ESP2D");
            var time = getSettings(mod, "Render Time", 0);
            uithread(() => {
                try {
                    getCode(mod).initted = true;
                    //android.os.Looper.prepare();
                    new android.os.Handler().postDelayed({
                        run() {
                            try {
                                var mod = getModule("ESP2D");
                                var time = getSettings(mod, "Render Time", 0);
                                var state = getState(mod);
                                if (state) {
                                    getCode(mod).lay.removeAllViews();
                                    //getCode(mod).DrawList = [];
                                    getCode(mod).lay.addView(getCode(mod).showbutton(getCode(mod).getNearestEntity(4096)));
                                    

                                } 
                                new android.os.Handler().postDelayed(this, time);
                            } catch (e) {
                                //getCode(mod).swing();

                                //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                errorMessage(e + ' at #' + e.lineNumber);
                                //getCode(mod).upd(); //reload
                            }
                        }
                    }, time);
                    android.os.Looper.loop();
                } catch (e) {
                    errorMessage(e)
                }

            })
        },
        getAngles(ent) {
            var mod = getModule("ESP2D");
            if (ent != null) {

                var x = Entity.getX(ent) - Player.getX();
                var y = Entity.getY(ent) + 0.5 - Player.getY()

                var z = Entity.getZ(ent) - Player.getZ();

                if (Entity.getEntityTypeId(ent) != 63) y += 0.5;
                var a = 0.5 + Entity.getX(ent);
                var b = Entity.getY(ent);
                var c = 0.5 + Entity.getZ(ent);
                var len = Math.sqrt(x * x + y * y + z * z);
                var y = y / len;
                var pitch = Math.asin(y);
                pitch = pitch * 180.0 / Math.PI;
                pitch = -pitch;
                var yaw = -Math.atan2(a - (Player.getX() + 0.5), c - (Player.getZ() + 0.5)) * (180 / Math.PI);
                //if (pitch < 89 && pitch > -89) {
                //Entity.setRot(Player.getEntity(), yaw, pitch);
                return [yaw, pitch]
                // }
            }
        },
        getDistance(ent) {
            var x = Player.getX();
            var y = Player.getY();
            var z = Player.getZ();
            var x1 = Entity.getX(ent);
            var y1 = Entity.getY(ent);
            var z1 = Entity.getZ(ent);
            var x2 = Math.pow(x1 - x, 2);
            var y2 = Math.pow(y1 - y, 2);
            var z2 = Math.pow(z1 - z, 2);
            return Math.sqrt(x2 + y2 + z2);
        },
        showbutton(player) {
            var mod = getModule("ESP2D");

            var width = ctx.getWindowManager().getDefaultDisplay().getWidth() / 2;
            var height = ctx.getWindowManager().getDefaultDisplay().getHeight() / 2

            var yaw = Entity.getYaw(Player.getEntity()) % 360;
            var pitch = Entity.getPitch(Player.getEntity()) % 360;

            var angl = getCode(mod).getAngles(player); //angl.x angl.y

            var yaw1 = angl[0] - yaw;
            var pitch1 = angl[1] - pitch;

            var btn = new android.widget.TextView(ctx);
            btn.setText(" " + clearName(Entity.getNameTag(player)) + " [" + Math.round(getCode(mod).getDistance(player)) + "m]");
            btn.setTextColor(android.graphics.Color.WHITE);
            btn.setTextSize(gs(17));
            //btn.setId(player);
            btn.setBackground(style.custom_corner("#2d2d2d", [10, 10, 10, 10, 10, 10, 10, 10]))
            btn.setTranslationX(width + width * Math.sin(yaw1 / 180 * Math.PI) / 2 - 50);
            btn.setTranslationY(height + height * Math.sin(pitch1 / 90 * Math.PI) / 2 - 50);
            btn.setGravity(android.view.Gravity.CENTER);
            btn.setSingleLine(true);
            btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            btn.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);

            return btn
        },
        hud() {
            var mod = getModule("ESP2D");
            uithread(() => {
                try {
                    getCode(mod).lay = new android.widget.LinearLayout(ctx);


                    getCode(mod).popup = new android.widget.PopupWindow(getCode(mod).lay, -1, -1);
                    getCode(mod).popup.setTouchable(!!0);
                    getCode(mod).popup.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
                    getCode(mod).popup.setTouchable(!!0);
                } catch (e) {
                    errorMessage(e)
                }
            })
            //setTranslationX(float)
        },
        getNearestEntity(range) {
            var mod = getModule("ESP2D");
            var players = Server.getAllPlayers();
            var small = range;
            var ent = null;



            for (var i = 0; i < players.length; i++) {
                if (!getCode(getModule("ClickFriends")).isFriend(i) && i != Player.getEntity()) {
                    var x = Entity.getX(players[i]) - Player.getX();
                    var y = Entity.getY(players[i]) - Player.getY();
                    var z = Entity.getZ(players[i]) - Player.getZ();
                    var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                    var yaw = Entity.getYaw(Player.getEntity()) % 360;
                    var pitch = Entity.getPitch(Player.getEntity()) % 360;

                    var angl = getCode(mod).getAngles(i); //angl.x angl.y

                    var getMoveDistance = (x, y, x1, y1) => {
                        return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
                    }

                    /*var art = false;
                    if(getMoveDistance(yaw,pitch,angl[0],angl[1]) < 90){
                        art = true;
                    }else{
                        if(angl[0] > yaw && (angl[0] - yaw) < 90){
                           art = true;
                        }else{
                           if(angl[0] < yaw && (yaw - angl[0]) < 90){
                               art = true;
                           }
                        }
                    }*/
                    // && getMoveDistance(yaw,pitch,angl[0],angl[1]) < 90
                    if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
                        small = dist;
                        ent = players[i];
                    }
                }
            }
            //print(getMoveDistance(yaw,pitch,angl[0],angl[1]))
            return ent;
            //print(getMoveDistance(yaw,pitch,angl[0],angl[1]))
        },
        toggle() {
            var mod = getModule("ESP2D");
            if (getState(mod)) {
                getCode(mod).hud();
                if (!getCode(mod).initted) {
                    getCode(mod).upd();
                    getCode(mod).initted = true;
                }
            } else {
                getCode(mod).popup.dismiss();
            }
        }
        /*avr() {
            var mod = getModule("ESP2D");
            if (getState(mod)) {
                try {

                    getCode(mod).lay.removeAllViews();
                    getCode(mod).DrawList = [];
                    getCode(mod).lay.addView(getCode(mod).showbutton(getCode(mod).getNearestEntity(4096)));
                    /*Server.getAllPlayers().forEach((e,i,a) => {
                    if(a.length != 0){
                        var ab = null;
                    getCode(mod).DrawList.push(getCode(mod).showbutton(e,ab));
                    getCode(mod).lay.addView(getCode(mod).DrawList[i]);

                    var width = ctx.getWindowManager().getDefaultDisplay().getWidth() / 2;
                    var height = ctx.getWindowManager().getDefaultDisplay().getHeight() / 2
        
                    var yaw = Entity.getYaw(Player.getEntity()) % 360;
                    var pitch = Entity.getPitch(Player.getEntity());

                    var angl = getCode(mod).getAngles(getCode(mod).target);//angl.x angl.y

                    var yaw1 = yaw - angl.x;
                    var pitch1 = pitch - angl.y;

                    getCode(mod).DrawList[i].setTranslationX(width - (width * Math.sin(yaw1 / 180 * Math.PI)/2) - 50);
                    getCode(mod).DrawList[i].setTranslationY(height - (height * Math.sin(pitch1 / 90 * Math.PI)/2) - 50);
                }
                })*/



        /*var ent = getCode(getModule("AimBot")).getNearestEntity(4096);
                if(ent != null && Player.getName(ent) != "" && Player.getName(ent) != " " && Player.getName(ent)){
                if(getCode(mod).target != ent) { 
                    getCode(mod).lay.removeAllViews();
                    getCode(mod).target = ent
                    getCode(mod).lay.addView(getCode(mod).showbutton(getCode(mod).target));
                }else{
                    if(getCode(mod).target != -1 && confirmScreenSafe() && ent != -1 && ent != null && getCode(getModule("EntityList")).isValid(ent)){

                        var width = ctx.getWindowManager().getDefaultDisplay().getWidth() / 2;
                        var height = ctx.getWindowManager().getDefaultDisplay().getHeight() / 2
            
                        var yaw = Entity.getYaw(Player.getEntity()) % 360;
                        var pitch = Entity.getPitch(Player.getEntity());

                        var angl = getCode(mod).getAngles(getCode(mod).target);//angl.x angl.y

                        var yaw1 = yaw - angl.x;
                        var pitch1 = pitch - angl.y;

                        //yaw1 = yaw1 - yaw1 * Math.sin(yaw1 / 180 * Math.PI);
                        //pitch1 = pitch1 - pitch1 * Math.sin(pitch1 / 90 * Math.PI);

                        getCode(mod).btn.setTranslationX(width - (width * Math.sin(yaw1 / 180 * Math.PI)/2) - 50);
                        getCode(mod).btn.setTranslationY(height - (height * Math.sin(pitch1 / 90 * Math.PI)/2) - 50);
                        //getCode(mod).btn.setText(clearName(Entity.getNameTag(player)) + " ["+yaw1 + "]");
                        //getCode(mod).lay.addView(getCode(mod).showbutton(getCode(mod).target));
                    }
                };
            }
                } catch (e) {
                    print(e + e.lineNumber)
                }
            }
        },*/
    });
    associateModule("Fucker,BF", [!1, !1], "Player", 0, {
        tick() {
            var mod = getModule("Fucker");
            var range = 6;
            var allowed = [26, 122, 92, 54];
            var x = Math.round(Player.getX());
            var y = Math.round(Player.getY());
            var z = Math.round(Player.getZ());
            if (getState(mod)) {
                for (var X = x - range; X < x + range; X++) {
                    for (var Y = y - range; Y < y + range; Y++) {
                        for (var Z = z - range; Z < z + range; Z++) {
                            if (allowed.indexOf(Level.getTile(X, Y, Z)) != -1) Level.setTile(X, Y, Z, 0, 0); //Level.destroyBlock(X, Y, Z, 2);
                            //if (id == 26) destroy = true;      // Beds
                            //if (id == 122) destroy = true;     // Dragon Eggs
                            //if (id == 92) destroy = true;     // Cakes
                            //if (id == 54) destroy = true;    // Chests
                            //if (id == 458) destroy = true;  // Barrels

                            //if (destroy) {
                            //    gm->destroyBlock(&blockPos, 0);
                            //    if (!moduleMgr->getModule<NoSwing>()->isEnabled()) 
                            //        g_Data.getLocalPlayer()->swingArm();
                            //    return;
                            //}
                        }
                    }
                }
            }
        }
    });
    associateModule("TestSpammer,TS", [!1, !1], "Player", [{
        name: "MPS",
        type: "int",
        value: "50,1,100"
    }, {
        name: "From EntityList",
        type: "bool",
        value: false
    }], {
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        toggled: false,
        init() {
            try {
                var mod = getModule("TestSpammer");
                var state = getState(mod);
                var sett = getSettings(mod, "MPS", 0);
                var hostThread = new java.lang.Thread(new java.lang.Runnable({
                    run() {
                        try {
                            android.os.Looper.prepare();
                            new android.os.Handler().postDelayed(new java.lang.Runnable({
                                run() {
                                    try {
                                        if (getState(mod) && sscreen.indexOf("chat") != -1 && !opn) {
                                            var inst = new android.app.Instrumentation;
                                            sett = getSettings(mod, "MPS", 0);
                                            var sett1 = getSettings(mod, "From EntityList", 0);
                                            /*com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeSetTextboxText("! - Halcyon - the best mcpe hacked client! ("+getCode(getModule("TestSpammer")).random(0,1000)+")");
                                            com.mojang.minecraftpe.MainActivity.currentMainActivity.get().updateTextboxText("! - Halcyon - the best mcpe hacked client! ("+getCode(getModule("TestSpammer")).random(0,1000)+")");*/
                                            var list = getCode(getModule("EntityList")).list;
                                            if (sett1) {
                                                var players = list;
                                            } else {
                                                var players = Server.getAllPlayers();
                                            }

                                            players.forEach(function (e) {
                                                var ename = clearName(Entity.getNameTag(e)).indexOf(" ") != -1 ? clearName(Entity.getNameTag(e)).split(' ')[1] : clearName(Entity.getNameTag(e));
                                                //Entity.setNameTag(e, ename)
                                                if (e != Player.getEntity() && !getCode(getModule("ClickFriends")).isFriend(e) && e != -1 && ename != undefined) {

                                                    com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeSetTextboxText("/w " + ename + " ! - Halcyon: vk: nofairplay");
                                                    com.mojang.minecraftpe.MainActivity.currentMainActivity.get().updateTextboxText("/w " + ename + " ! - Halcyon: vk: nofairplay");

                                                    // com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeSetTextboxText("! - Halcyon: vk: nofairplay");
                                                    //   com.mojang.minecraftpe.MainActivity.currentMainActivity.get().updateTextboxText("! - Halcyon: vk: nofairplay");

                                                    inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ENTER);
                                                }
                                            });


                                        } //getCode(mod).swing();

                                        new android.os.Handler().postDelayed(this, 1000 / sett);
                                    } catch (e) {
                                        //getCode(mod).swing();

                                        //new android.os.Handler().postDelayed(this, 1000 / CPS);
                                        errorMessage(e + ' at #' + e.lineNumber);
                                        getCode(mod).init(); //reload
                                    }
                                }
                            }), 1000 / sett);
                            android.os.Looper.loop();
                        } catch (e) {
                            errorMessage(e)
                        }

                    }
                }))
                hostThread.start();
            } catch (e) {
                errorMessage(e)
            }
        },
        //var a = "§7§l[§6Gold§7]§a GoldyYt"
        //console.log(a.replace(/§1/g, "").replace(/§2/g, "").replace(/§3/g, "").replace(/§4/g, "").replace(/§5/g, "").replace(/§6/g, "").replace(/§7/g, "").replace(/§8/g, "").replace(/§9/g, "").replace(/§0/g, "").replace(/§a/g, "").replace(/§b/g, "").replace(/§c/g, "").replace(/§d/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§l/g, "").replace(/§k/g, "").replace(/§o/g, "").replace(/§r/g, ""))
        toggle() {
            try {
                var mod = getModule("TestSpammer");
                if (getCode(mod).toggled == false) {
                    getCode(mod).init();
                    getCode(mod).toggled = true;
                }
            } catch (e) {
                errorMessage(e)
            }
        }
        /*tick(){
            var mod = getModule("TestSpammer");
        //com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeKeyHandler(45, true);
        //com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeKeyHandler(45, false);
        //com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeKeyHandler(81, true)
        if(getState(mod) && sscreen.indexOf("chat") != -1){
            com.mojang.minecraftpe.MainActivity.currentMainActivity.get().nativeSetTextboxText("! - Halcyon - the best mcpe hacked client! ("+getCode(getModule("TestSpammer")).random(0,1000)+")");
            com.mojang.minecraftpe.MainActivity.currentMainActivity.get().updateTextboxText("! - Halcyon - the best mcpe hacked client! ("+getCode(getModule("TestSpammer")).random(0,1000)+")");
        }}*/
    });
    associateModule("TapMessage,TM", [!1, !1], "Misc", 0, {
        gui: null,
        say(what) {
            var hostThread = new java.lang.Thread(new java.lang.Runnable({
                run() {
                    try {
                        var inst = new android.app.Instrumentation;
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_T);
                        java.lang.Thread.sleep(100);
                        /*inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_H);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_A);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_L);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_C);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Y);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_O);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_N);*/
                        inst.sendStringSync(what);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ENTER);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_BACK);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_BACK);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);
                        inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);
                        //inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);
                        //inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);
                        //inst.sendKeySync(android.view.KeyEvent.KEYCODE_ESCAPE);
                        //android.os.Looper.prepare();

                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            hostThread.start();
        },
        button() {
            var mod = getModule("TapMessage");
            // if (getState(mod)) 
            uithread(() => {
                try {

                    let move = false;
                    let dx = 0;
                    let dy = 0;
                    let PosX = 0;
                    let PosY = 0;
                    var moving = false;

                    let btn = new android.widget.TextView(ctx);
                    btn.setText(mod.name[1]);
                    btn.setTextColor(-1);
                    btn.setTextSize(gs(14));
                    btn.setTransformationMethod(null);
                    btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
                    btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                    btn.setBackground(style.main());
                    btn.setGravity(android.view.Gravity.CENTER);
                    btn.setOnTouchListener(new android.view.View.OnTouchListener({
                        onTouch: function (view, motionEvent) {
                            try {
                                move = true;
                                //if (!move) {
                                //return false
                                // };

                                switch (motionEvent.getAction()) {
                                    case android.view.MotionEvent.ACTION_DOWN:
                                        btn.setBackground(style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));

                                        break;
                                    case android.view.MotionEvent.ACTION_UP:
                                        btn.setBackground(style.main());
                                        if (!moving) {
                                            if (confirmScreenSafe()) getCode(mod).say();
                                        };
                                        break;
                                    case android.view.MotionEvent.ACTION_CANCEL:
                                        break;
                                }
                                if (!move) return false;
                                switch (motionEvent.getAction()) {
                                    case android.view.MotionEvent.ACTION_DOWN:
                                        dx = PosX - motionEvent.getRawX();
                                        dy = PosY - motionEvent.getRawY();
                                        break;
                                    case android.view.MotionEvent.ACTION_MOVE:
                                        //clientMessage(((motionEvent.getRawX() + dx)-PosX));
                                        if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                            //sleep(15);
                                            moving = true;
                                            PosX = (motionEvent.getRawX() + dx);
                                            PosY = (motionEvent.getRawY() + dy);
                                            getCode(mod).gui.update(PosX, PosY, -1, -1);
                                        }
                                        break;
                                    case android.view.MotionEvent.ACTION_UP:
                                    case android.view.MotionEvent.ACTION_CANCEL:
                                        move = false;

                                        moving = false
                                        break;
                                }
                            } catch (e) {
                                errorMessage(e);
                            }
                            return true;
                        }
                    }));

                    getCode(mod).gui = new android.widget.PopupWindow(btn, gs(dip2px(50)), gs(dip2px(50)));
                    getCode(mod).gui.setAnimationStyle(android.R.style.Animation_Dialog);
                    getCode(mod).gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                    //getCode(mod).gui.update(ctx.getWindowManager().getDefaultDisplay().getWidth() / 2, ctx.getWindowManager().getDefaultDisplay().getHeight() / 2, -1, -1)

                } catch (e) {
                    errorMessage(e)
                }
            })
        },
        toggle() {
            var mod = getModule("TapMessage");
            if (getState(mod)) {
                getCode(mod).button();
            } else {
                getCode(mod).gui.dismiss();
            }
        }
    });
    associateModule("TestModule,+", [!1, !1], "Misc", 0, {
        old: 0,
        state: true,
        tick(){
            var mod = getModule("TestModule");
            if (getState(mod)) {
                var velx = Entity.getVelX(getCode(getModule("AimBot")).getNearestEntity(4096));
                var vely = Entity.getVelY(getCode(getModule("AimBot")).getNearestEntity(4096));
                var velz = Entity.getVelZ(getCode(getModule("AimBot")).getNearestEntity(4096));
                
                clientMessage(velx + " " + vely + " " +velz);//Toast.makeText(ctx, Player.getLevel(), 1).show();
                //java.lang.Thread.sleep(50);
            }
        },
        toggle() {
            
        }
    });
    associateModule("Blink,+", [!1, !1], "Misc", 0, {
        toggled: false,
        init() {
            try {
                var str = "param1=" + java.net.URLEncoder.encode("87845", "UTF-8");

                var hostThread = new java.lang.Thread(new java.lang.Runnable({
                    run() {
                        try {
                            android.os.Looper.prepare();
                            new android.os.Handler().postDelayed(new java.lang.Runnable({
                                run() {
                                    try {
                                        var mod = getModule("Blink");
                                        var state = getState(mod);
                                        if (state) {
                                            var u = new java.net.URL("http://localhost");
                                            var a = u.openConnection();
                                            a.setDoOutput(true);
                                            a.setDoInput(true);
                                            a.setRequestMethod("GET");
                                            a.setRequestProperty("charset", "utf-8");
                                            //a.setRequestProperty("Host", this.request);
                                            a.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0) Gecko/20100101 Firefox/8.0");
                                            a.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                                            a.setRequestProperty("Content-Length", str);

                                            customMessage(this + " " + a.getResponseCode());

                                            new android.os.Handler().postDelayed(this, 100);

                                        }

                                    } catch (e) {
                                        errorMessage(e + ' at #' + e.lineNumber);
                                        getCode(mod).init(); //reload
                                    }
                                }
                            }), 100);
                            android.os.Looper.loop();
                        } catch (e) {
                            errorMessage(e)
                        }

                    }
                }))
                hostThread.start();
            } catch (e) {
                errorMessage(e)
            }
        },
        toggle() {
            try {
                var mod = getModule("Blink");
                if (getCode(mod).toggled == false) {
                    getCode(mod).init();
                    getCode(mod).toggled = true;
                }
            } catch (e) {
                errorMessage(e)
            }
        }
    });
};

/*------------------------*\
| 🔥 Main
\*------------------------*/

var customMessage = (msg) => {
    clientMessage("§4§lH§falcyon §7>§r " + msg)
}
var askedForMessage = false;
var sscreen = "";
var confirmScreenSafe = () => {
    if (Player.getEntity() != -1) return true;
    return false
    //if (sscreen == "hud_screen") {
    //return true
    // } else {
    //     return false
    // }
} //by Shark. Taken from Jelly v0.9
function confirmGameScreen() {
    /*if (confirmScreenSafe() || sscreen == "chat_screen" || sscreen == "survival_inventory_screen" || sscreen == "creative_inventory_screen" || sscreen == "small_chest_screen" || sscreen == "large_chest_screen") {
        return true
    } else {
        return false
    }*/
    return true
}

var scale = 1;

//avr tick
var avr = () => {
    ctx.runOnUiThread({
        run() {
            try {

                new android.os.Handler()
                    .postDelayed({
                        run() {
                            Halcyon.mods.forEach((e) => {
                                if (getCode(e).hasOwnProperty("avr")) {
                                    getCode(e).avr();
                                }
                            });
                            if (getState(getModule("ESP"))) Render.glSurface.requestRender();
                            if (getState(getModule("TraceLines"))) Render_tracers.Render.glSurface.requestRender();
                            if (popup_menu != null && popup_menu.isShowing()) {
                                opn = true;
                            } else {
                                opn = false;
                            }
                            eval(avr())
                        }
                    }, 1)
            } catch (e) {
                clientMessage(e)
            }
        }
    })
}

// fast uithread 
var uithread = (t) => {
    ctx.runOnUiThread({
        run() {
            try {
                t();
            } catch (e) {
                errorMessage(e);
            };
        }
    });
};

var gs = (number) => {
    return number * scale;
};

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
};
var filemanager = {
    select: function (dir, fileName) {
        return (new java.lang.File(dir, fileName));
    },
    exists: function (selectedFile) {
        return selectedFile.exists();
    },
    isFile: function (file) {
        return file.isFile();
    },
    isDirectory: function (path) {
        return path.isDirectory();
    },
    create: function (selectedFile) {
        selectedFile.createNewFile();
        return selectedFile;
    },
    del: function (selectedFile) {
        selectedFile.delete();
    },
    read: function (selectedFile) {
        var readed = (new java.io.BufferedReader(new java.io.FileReader(selectedFile)));
        var data = new java.lang.StringBuilder();
        var string;
        while ((string = readed.readLine()) != null) {
            data.append(string);
            data.append('\n');
        }
        return data.toString();
    },
    readLine: function (selectedFile, line) {
        var readT = new filemanager.read(selectedFile);
        var lineArray = readT.split('\n');
        return lineArray[line - 1];
    },
    readKey: function (selectedFile, key, keySeparator) {
        var isText = 0;
        var textR = new filemanager.read(selectedFile);
        var splitTextR = textR.split('\n');
        for (var i = 0; i < splitTextR.length; i++) {
            var textRF = splitTextR[i].split(keySeparator);
            if (textRF[0] == key) {
                return textRF[1];
                isText = 1;
                break;
            }
            if (!isText) {
                return '[Unknown]';
            }
        }
    },
    write: function (selectedFile, text) {
        file.rewrite(selectedFile, (new manager.read(selectedFile)) + text);
    },
    rewrite: function (selectedFile, text) {
        var writeFOS = new java.io.FileOutputStream(selectedFile);
        writeFOS.write(new java.lang.String(text)
            .getBytes());
    }
};
var config = {
    dir: android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon/configs",
    createmaincfg() {
        var file = new java.io.File(config.dir, "main.ini");
        if (java.io.File(file).exists())
            file.createNewFile();
        var input = "";
        Halcyon.mods.forEach((e, i, a) => {
            input = input + e.name[0] + ":" + getState(e) + "," + getBindState(e) + ":";
            e.settings.forEach((e) => {
                if (e.type != "bool")
                    input = input + e.name + "," + e.values[0] + ";"
                else
                    input = input + e.name + "," + e.values + ";"
            })
            if (!i != a.length)
                input = input + "\n"
        });
        filemanager.rewrite(file, input);
    },
    createpath() {
        if (!java.io.File(config.dir).exists()) java.io.File(config.dir).mkdirs();
    },
    createmain() {
        var file = new java.io.File(config.dir, "default.cfg");
        if (java.io.File(file).exists())
            file.createNewFile();
        var input = "";
        Halcyon.mods.forEach((e, i, a) => {
            input = input + e.name[0] + ":" + getState(e) + "," + getBindState(e) + ":";
            e.settings.forEach((e) => {
                if (e.type != "bool")
                    input = input + e.name + "," + e.values[0] + ";"
                else
                    input = input + e.name + "," + e.values + ";"
            })
            if (!i != a.length)
                input = input + "\n"
        });
        filemanager.rewrite(file, input);
    },
    create(name) {
        try {
            var file = new java.io.File(config.dir, name + ".cfg");
            if (java.io.File(file).exists())
                file.createNewFile();
            var input = "<MM>\n";
            Halcyon.mods.forEach((e, i, a) => {
                input = input + e.name[0] + ":" + getState(e) + "," + getBindState(e) + ":" + e.pos[0] + "," + e.pos[1] + ":";
                e.settings.forEach((e) => {
                    if (e.type != "bool")
                        input = input + e.name + "," + e.values[0] + ";"
                    else
                        input = input + e.name + "," + e.values + ";"
                })
                if (!i != a.length)
                    input = input + "\n"
            });
            filemanager.rewrite(file, input);
            customMessage("§aConfig §7§l'" + name + "'§r§a successful saved!")
        } catch (e) {
            errorMessage(e);
            notification("<font color='red'>Attention!</font> <font color='white'>This config may have loaded incorrectly!</font>")
        }
    },
    load(name) {
        try {
            var file = new java.io.File(config.dir, name + ".cfg");
            if (java.io.File(file).exists()) {
                if (filemanager.read(file).indexOf("<MM>\n") != -1) {
                    //var input = new Array(filemanager.read(file).split('\n'));

                    //var input = filemanager.read(file)
                    //clientMessage(typeof String(filemanager.read(file)).split('\n'));
                    //clientMessage(typeof String(filemanager.read(file)).split('\n'));
                    //input.split('\n');
                    uithread(() => {
                        Halcyon.mods.forEach((e, i, a) => {
                            //disabling
                            //  var p = e.split('\n');
                            if (e.state[0]) {
                                if (getCode(e).toggle != undefined) getCode(e).toggle();
                            };
                            if (e.state[1]) {
                                if (e.bind != null)
                                    if (e.bind.isShowing()) e.bind.dismiss();
                            }
                            if (getCode(e).gui != undefined && getCode(e).gui != null)
                                if (getCode(e).gui.isShowing()) getCode(e).gui.dismiss();

                            e.state[0] = false;
                            e.state[1] = false;


                        })
                    });

                    var input = String(filemanager.read(file)).replace("<MM>\n", "").split('\n')
                    input.forEach((e, i, a) => {
                        if (i != a.length - 1) {
                            var par = e.split(":");
                            var mod = getModule(par[0]);
                            var state = par[1].split(",");

                            //var pos = [];
                            var pos = par[2].split(",");
                            mod.pos[0] = parseFloat(pos[0]);
                            mod.pos[1] = parseFloat(pos[1]);


                            //pos.push(parseFloat(pos1[0]))
                            if (par[3] != "") {
                                var settings = par[3].split(';');
                                var newsettings = [];
                                settings.forEach((e, i, a) => {
                                    if (i != a.length - 1) {
                                        newsettings.push(e)
                                    }
                                });
                                settings = newsettings;

                                settings.forEach((e, i, a) => {
                                    var sett = e.split(',');
                                    var type = (sett[1] == ("true" || "false") ? "bool" : "other");
                                    var varible = false;
                                    if (type == "bool") {
                                        varible = (sett[1] == "true" ? true : false);
                                        mod.settings[i].values = varible

                                    } else {
                                        if (type == "int") {
                                            varible = parseFloat(sett[1]);
                                            mod.settings[i].values[0] = varible
                                        } else {
                                            varible = sett[1];
                                            mod.settings[i].values[0] = varible
                                        }
                                    }

                                })
                            };
                            mod.state[0] = (state[0] == "true" ? true : false);
                            mod.state[1] = (state[1] == "true" ? true : false);

                            if (mod.state[0]) {
                                if (getCode(mod).toggle != undefined) getCode(mod).toggle();
                            };
                            if (getBindState(mod)) {
                                bindbutton(mod);
                            };
                        }
                    })
                    customMessage("§aConfig §7§l'" + name + "'§r§a successful loaded!")


                } else {
                    notification("<font color='red'>Error!</font> <font color='white'>This config isn't supported in your launcher!</font>")
                } //--For  && filemanager.read(file).indexOf("<MM>") == -1
            } else {
                customMessage("§eConfig §7§l'" + name + "'§r§e does not exists!")
            }
        } catch (e) {
            errorMessage(e)
        }
    }
}
config.createpath();
config.createmain();

// Render 
var Render = {
    getFloatBuffer: function (fArray) {
        var bBuffer = java.nio.ByteBuffer.allocateDirect(fArray.length * 4);
        bBuffer.order(java.nio.ByteOrder.nativeOrder());

        var fBuffer = bBuffer.asFloatBuffer();
        var fBuffer = bBuffer.asFloatBuffer();
        fBuffer.put(fArray);
        fBuffer.position(0);
        return fBuffer;
    },
    getShortBuffer: function (sArray) {
        var bBuffer = java.nio.ByteBuffer.allocateDirect(sArray.length * 2);
        bBuffer.order(java.nio.ByteOrder.nativeOrder());

        var sBuffer = bBuffer.asShortBuffer();
        sBuffer.put(sArray);
        sBuffer.position(0);
        return sBuffer;
    },
    renderer: null,
    glSurface: null,
    fov: 90,
    initted: !1,
    init() {
        /*var t = new java.lang.Thread({
            run(){
                try{*/

        //var mod = getModule("ESP");
        //var sett = getSettings(mod, "From EntityList", 0);

        /*var options = client.utils.File.getTextFromFile(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/", "options.txt"));

        options = options.split("\n");
        options.forEach(function (entry) {
            var suboption = entry.split(":");
            if (suboption[0] == "gfx_field_of_view") {
                Render.fov = suboption[1];

            }
        });*/
        let options = filemanager.read(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/", "options.txt"));
        options = options.split("\n");
        options.forEach(function (entry) {
            let suboption = entry.split(":");
            if (suboption[0] == "gfx_field_of_view") {
                Render.fov = suboption[1];
            }
        });
        this.renderer = new android.opengl.GLSurfaceView.Renderer({
            onSurfaceCreated: function (gl, config) {
                var GL10 = javax.microedition.khronos.opengles.GL10;

                gl.glEnable(javax.microedition.khronos.opengles.GL10.GL_TEXTURE_2D);
                gl.glShadeModel(javax.microedition.khronos.opengles.GL10.GL_SMOOTH);
                gl.glClearColor(0, 0, 0, 0);
                gl.glClearDepthf(1);
                gl.glEnable(javax.microedition.khronos.opengles.GL10.GL_DEPTH_TEST);
                gl.glDepthFunc(javax.microedition.khronos.opengles.GL10.GL_LEQUAL);
                gl.glHint(javax.microedition.khronos.opengles.GL10.GL_PERSPECTIVE_CORRECTION_HINT, javax.microedition.khronos.opengles.GL10.GL_NICEST);
                //errorMessage("created");
            },
            onSurfaceChanged: function (gl, width, height) {
                //errorMessage("Changing...");
                var GL10 = javax.microedition.khronos.opengles.GL10;
                gl.glMatrixMode(GL10.GL_PROJECTION);
                gl.glLoadIdentity();
                android.opengl.GLU.gluPerspective(gl, Render.fov, width / height, 0.1, 100);
                gl.glMatrixMode(GL10.GL_MODELVIEW);
                gl.glLoadIdentity();
                //errorMessage("changed");
            },
            onDrawFrame: function (gl) {
                //errorMessage("Drawing...");
                var GL10 = javax.microedition.khronos.opengles.GL10;
                gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
                gl.glLoadIdentity();
                gl.glDisable(GL10.GL_LIGHTING);

                var mod1 = getModule("ESP");
                var mod2 = getModule("Tracers");
                if (confirmScreenSafe()) { //m && c1.state[0]
                    try {
                        var yaw = Entity.getYaw(Player.getEntity()) % 360;
                        var pitch = Entity.getPitch(Player.getEntity()) % 360;
                        var eyeX = Player.getX();
                        var eyeY = Player.getY() + 1;
                        var eyeZ = Player.getZ();

                        var dCenterX = Math.sin(yaw / 180 * Math.PI);
                        var dCenterZ = Math.cos(yaw / 180 * Math.PI);
                        var dCenterY = Math.sqrt(dCenterX * dCenterX + dCenterZ * dCenterZ) * Math.tan((pitch - 180) / 180 * Math.PI);

                        var centerX = eyeX - dCenterX;
                        var centerZ = eyeZ + dCenterZ;
                        var centerY = eyeY - dCenterY;

                        android.opengl.GLU.gluLookAt(gl, eyeX, eyeY, eyeZ, centerX, centerY, centerZ, 0, 1.0, 0);






                        try {
                            //getCode(mod).render(gl);
                            //Halcyon.mods.forEach((e, i, a) => {
                            //     if (getCode(e).hasOwnProperty("render")) getCode(e).render(gl)
                            //})
                            getCode(getModule("ESP")).render(gl)
                            //gl.glTranslatef(0,0,0);
                        } catch (e) {
                            errorMessage(e)
                        }

                        //gl.glTranslatef(Entity.getX(entry), Entity.getY(entry), Entity.getZ(entry));
                        //gl.glRotatef(180 - yaw, 0, 1, 0);
                    } catch (e) {
                        errorMessage("RenderProblem: " + e);
                    }

                }
            }
        });
        ctx.runOnUiThread(new java.lang.Runnable({
            run() {
                Render.glSurface = new android.opengl.GLSurfaceView(ctx);
                Render.glSurface.setZOrderOnTop(!0);


                Render.glSurface.setEGLConfigChooser(8, 8, 8, 8, 16, 0);
                Render.glSurface.getHolder().setFormat(android.graphics.PixelFormat.TRANSLUCENT);
                Render.glSurface.setRenderer(Render.renderer);
                Render.glSurface.setRenderMode(0);

                ctx.getWindow().getDecorView().addView(Render.glSurface);

                Render.initted = !0;
            }
        }));

        /* }catch(e){
             errorMessage(e)
         }}})
             t.start();
         */
    },
    drawBox(gl, x, y, z, xsize, ysize, zsize, friend) {
        //var mod = getModule("ESP");
        var GL10 = javax.microedition.khronos.opengles.GL10;
        var size = new Array(xsize, ysize, zsize);
        var vertices = [
            0, 0, 0,
            size[0], 0, 0,
            0, 0, size[2],
            size[0], 0, size[2],

            0, size[1], 0,
            size[0], size[1], 0,
            0, size[1], size[2],
            size[0], size[1], size[2]
        ];
        var vertexBuffer = Render.getFloatBuffer(vertices);
        var indices = [
            0, 1,
            0, 2,
            0, 4,

            3, 1,
            3, 2,
            3, 7,

            5, 4,
            5, 7,
            5, 1,

            6, 4,
            6, 7,
            6, 2
        ];
        var indexBuffer = Render.getShortBuffer(indices);
        gl.glTranslatef(x, y, z);
        //gl.glRotatef(180 - Entity.getYaw(Player.getEntity()), 0, 1, 0);
        gl.glFrontFace(GL10.GL_CCW);
        //gl.glEnable(GL10.GL_CULL_FACE);
        //gl.glCullFace(GL10.GL_BACK);
        gl.glEnable(GL10.GL_BLEND);
        //var yaw = Entity.getYaw(Player.getEntity());
        //gl.glRotatef(180 - yaw, 0, 1, 0);
        gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
        gl.glLineWidth(5);
        if (!friend)
            gl.glColor4f(0.9, 0.1, 0.1, 0.8)
        else
            gl.glColor4f(0.1, 0.9, 0.1, 0.8);
        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
        gl.glDrawElements(GL10.GL_LINES, indices.length, GL10.GL_UNSIGNED_SHORT, indexBuffer);
        gl.glTranslatef(-x, -y, -z);
    },
    drawBoxFilled(gl, x, y, z, xsize, ysize, zsize, friend) {
        //var mod = getModule("ESP");
        var GL10 = javax.microedition.khronos.opengles.GL10;
        var size = new Array(xsize, ysize, zsize);
        var vertices = [
            0, 0, 0,
            size[0], 0, 0,
            0, 0, size[2],
            size[0], 0, size[2],

            0, size[1], 0,
            size[0], size[1], 0,
            0, size[1], size[2],
            size[0], size[1], size[2]
        ];
        var vertexBuffer = Render.getFloatBuffer(vertices);
        var indices = [
            0, 1,
            0, 2,
            0, 4,

            3, 1,
            3, 2,
            3, 7,

            5, 4,
            5, 7,
            5, 1,

            6, 4,
            6, 7,
            6, 2
        ];
        var indexBuffer = Render.getShortBuffer(indices);
        gl.glTranslatef(x, y, z);
        //gl.glRotatef(180 - Entity.getYaw(Player.getEntity()), 0, 1, 0);
        gl.glFrontFace(GL10.GL_CCW);
        //gl.glEnable(GL10.GL_CULL_FACE);
        //gl.glCullFace(GL10.GL_BACK);
        gl.glEnable(GL10.GL_BLEND);
        gl.glEnable(GL10.GL_LINE_SMOOTH);
        //var yaw = Entity.getYaw(Player.getEntity());
        //gl.glRotatef(180 - yaw, 0, 1, 0);
        gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
        gl.glLineWidth(5);

        gl.glColor4f(1, 1, 0, 0.8);
        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
        //gl.glDrawElements(GL10.GL_LINES, indices.length, GL10.GL_UNSIGNED_SHORT, indexBuffer);
        gl.glDrawElements(GL10.GL_TRIANGLES, indices.length, GL10.GL_UNSIGNED_SHORT, polyBuffer);
        gl.glDisable(GL10.GL_LINE_SMOOTH);
        gl.glTranslatef(-x, -y, -z);
    },
    drawLine: function (gl, x, y, z, x2, y2, z2, friend) {
        let GL10 = javax.microedition.khronos.opengles.GL10;
        let size = new Array(x2, y2, z2);
        let vertices = [0, 0, 0, x2 - x, y2 - y, z2 - z];
        let vertexBuffer = Render.getFloatBuffer(vertices);
        let indices = [0, 1];
        let indexBuffer = Render.getShortBuffer(indices);
        gl.glTranslatef(x, y, z);
        gl.glEnable(GL10.GL_BLEND);
        gl.glDepthMask(false);
        gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
        gl.glLineWidth(5);
        if (!friend)
            gl.glColor4f(0.9, 0.1, 0.1, 0.8)
        else
            gl.glColor4f(0.1, 0.9, 0.1, 0.8);
        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
        gl.glDrawElements(GL10.GL_LINES, indices.length, GL10.GL_UNSIGNED_SHORT, indexBuffer);
        gl.glTranslatef(-x, -y, -z);
        gl.glDepthMask(true);
        gl.glDisable(GL10.GL_LINE_SMOOTH);
    },
    /*drawLine: function (gl, x, y, z, x2, y2, z2,friend) {
		let GL10 = javax.microedition.khronos.opengles.GL10;
		let size = new Array(x2, y2, z2);
		let vertices = [0, 0, 0, x2 - x, y2 - y, z2 - z];
		let vertexBuffer = Render.getFloatBuffer(vertices);
		let indices = [0, 1];
		let indexBuffer = Render.getShortBuffer(indices);
		gl.glTranslatef(x, y, z);
		gl.glEnable(GL10.GL_BLEND);
		gl.glDepthMask(false);
		gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
		gl.glLineWidth(5);
		if (!friend)
                gl.glColor4f(0.9, 0.1, 0.1, 0.8)
            else
                gl.glColor4f(0.1, 0.9, 0.1, 0.8);

		gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
		gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
		gl.glDrawElements(GL10.GL_LINES, indices.length, GL10.GL_UNSIGNED_SHORT, indexBuffer);
		gl.glTranslatef(-x, -y, -z);
		gl.glDisable(GL10.GL_LINE_SMOOTH);
	}*/
};
var Render_tracers = {
    File: {
        getTextFromFile: function (file) {
            let readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
            let data = new java.lang.StringBuilder();
            let string;
            while ((string = readed.readLine()) != null) data.append(string + "\n");
            return data.toString();
        }
    },
    Render: {
        getFloatBuffer: function (fArray) {
            let bBuffer = java.nio.ByteBuffer.allocateDirect(fArray.length * 4);
            bBuffer.order(java.nio.ByteOrder.nativeOrder());
            let fBuffer = bBuffer.asFloatBuffer();
            fBuffer.put(fArray);
            fBuffer.position(0);
            return fBuffer;
        },
        getShortBuffer: function (sArray) {
            let bBuffer = java.nio.ByteBuffer.allocateDirect(sArray.length * 2);
            bBuffer.order(java.nio.ByteOrder.nativeOrder());
            let sBuffer = bBuffer.asShortBuffer();
            sBuffer.put(sArray);
            sBuffer.position(1);
            return sBuffer;
        },
        renderer: null,
        glSurface: null,
        fov: 90,
        initted: false,
        init: function () {
            if (Render_tracers.Render.initted) {
                this.renderer = null;
                return;
            }
            let options = Render_tracers.File.getTextFromFile(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/", "options.txt"));
            options = options.split("\n");
            options.forEach(function (entry) {
                let suboption = entry.split(":");
                if (suboption[0] == "gfx_field_of_view") {
                    Render_tracers.Render.fov = suboption[1];
                }
            });
            this.renderer = new android.opengl.GLSurfaceView.Renderer({
                onSurfaceCreated: function (gl, config) {
                    let GL10 = javax.microedition.khronos.opengles.GL10;
                    gl.glClearColor(0, 0, 0, 0);
                    gl.glShadeModel(GL10.GL_SMOOTH);
                    gl.glClearDepthf(1.0);
                    gl.glDisable(GL10.GL_DITHER);
                    gl.glDepthFunc(GL10.GL_LEQUAL);
                    gl.glHint(GL10.GL_PERSPECTIVE_CORRECTION_HINT, GL10.GL_NICEST);
                },
                onSurfaceChanged: function (gl, width, height) {
                    sw = width;
                    sh = height;
                    let GL10 = javax.microedition.khronos.opengles.GL10;
                    gl.glMatrixMode(GL10.GL_PROJECTION);
                    gl.glLoadIdentity();
                    android.opengl.GLU.gluPerspective(gl, Render_tracers.Render.fov, width / height, -0.1, 100);
                    gl.glMatrixMode(GL10.GL_MODELVIEW);
                    gl.glLoadIdentity();
                },
                onDrawFrame: function (gl) {
                    let GL10 = javax.microedition.khronos.opengles.GL10;
                    gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
                    gl.glLoadIdentity();
                    if (confirmScreenSafe() && Player.getEntity() != -1) {
                        if (getState(getModule("TraceLines"))) {
                            try {
                                gl.glDisable(GL10.GL_LIGHTING);
                                let yaw = Entity.getYaw(Player.getEntity()) % 360;
                                let pitch = Entity.getPitch(Player.getEntity()) % 360;
                                let eyeX = Player.getX();
                                let eyeY = Player.getY() + 1;
                                let eyeZ = Player.getZ();
                                let dCenterX = Math.sin(yaw / 180 * Math.PI);
                                let dCenterZ = Math.cos(yaw / 180 * Math.PI);
                                let dCenterY = Math.sqrt(dCenterX * dCenterX + dCenterZ * dCenterZ) * Math.tan((pitch - 180) / 180 * Math.PI);
                                let centerX = eyeX - dCenterX;
                                let centerZ = eyeZ + dCenterZ;
                                let centerY = eyeY - dCenterY;
                                android.opengl.GLU.gluLookAt(gl, eyeX, eyeY, eyeZ, centerX, centerY, centerZ, 0, 1, 0);
                                let mobs = Entity.getAll();
                                let players = Server.getAllPlayers();
                                var oX = Player.getX(),
                                    oY = Player.getY() + 1,
                                    oZ = Player.getZ();
                                Render_tracers.Render.fov = getSettings(getModule("TraceLines"), "Drawing FOV", 0)
                                // android.opengl.GLU.gluPerspective(gl, Render.fov, width / height, 0.1, 100);
                                getCode(getModule("TraceLines")).render(gl)
                            } catch (e) {
                                clientMessage(e)
                            }
                        }
                    } else {}
                }
            });
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function () {
                    Render_tracers.Render.glSurface = new android.opengl.GLSurfaceView(ctx);
                    Render_tracers.Render.glSurface.setZOrderOnTop(true);
                    Render_tracers.Render.glSurface.setEGLConfigChooser(8, 8, 8, 8, 16, 0);
                    Render_tracers.Render.glSurface.getHolder().setFormat(android.graphics.PixelFormat.TRANSLUCENT);
                    Render_tracers.Render.glSurface.setRenderer(Render_tracers.Render.renderer);
                    ctx.getWindow().getDecorView().addView(Render_tracers.Render.glSurface);
                    Render_tracers.Render.initted = true;
                }
            }));
        },
        drawLine: function (gl, x, y, z, x2, y2, z2, friend) {
            let GL10 = javax.microedition.khronos.opengles.GL10;
            let size = new Array(x2, y2, z2);
            let vertices = [0, 0, 0, x2 - x, y2 - y, z2 - z];
            let vertexBuffer = Render_tracers.Render.getFloatBuffer(vertices);
            let indices = [0, 1];
            let indexBuffer = Render_tracers.Render.getShortBuffer(indices);
            gl.glTranslatef(x, y, z);
            gl.glEnable(GL10.GL_BLEND);
            gl.glDepthMask(false);
            gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
            gl.glLineWidth(6);
            if (!friend)
                gl.glColor4f(0.9, 0.1, 0.1, 0.8)
            else
                gl.glColor4f(0.1, 0.9, 0.1, 0.8);
            gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
            gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
            gl.glDrawElements(GL10.GL_LINES, indices.length, GL10.GL_UNSIGNED_SHORT, indexBuffer);
            gl.glTranslatef(-x, -y, -z);
            gl.glDisable(GL10.GL_LINE_SMOOTH);
        }
    }
}
// hud
var pb = new android.widget.TextView(ctx);
var png = 0;
var pp = null;
var ppp = null;

var au7yn
var hud = () => {
    uithread(() => {
        try {
            //pb = new android.widget.TextView(ctx);
            pb.setText("Ping: " + png);
            pb.setTextColor(android.graphics.Color.WHITE);
            pb.setTextSize(gs(17));
            pb.setGravity(android.view.Gravity.RIGHT);
            pb.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            pb.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);

            //ping_meter

            ppp = new android.widget.PopupWindow(pb, -2, -2);
            ppp.setTouchable(!!0);
            ppp.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 15, 5);
            ppp.setTouchable(!!0);


        } catch (e) {
            errorMessage(e)
        }
    });
}
var watermark = () => {
    uithread(() => {
        try { //.getPaint().setShader(new android.graphics.LinearGradient(0, 200, 0, 0, [Rainbow((entry.button.getId()) * 200), Rainbow((entry.button.getId() + 2) * 200)], null, android.graphics.Shader.TileMode.MIRROR))
            //var lay = new LinearLayout(ctx);
            //lay.setOrientation(0);

            var pbt = new android.widget.TextView(ctx);
            pbt.setText(android.text.Html.fromHtml("Made by <font color='#ffd900'>au7yn</font>"));
            pbt.setTextColor(android.graphics.Color.WHITE);
            pbt.setTextSize(gs(17));
            pbt.setGravity(android.view.Gravity.RIGHT);
            pbt.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            pbt.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            //lay.addView(pbt);

            //ping_meter

            var pk = new android.widget.PopupWindow(pbt, -2, -2);
            pk.setTouchable(!!0);
            pk.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 15, 5);
            pk.setTouchable(!!0);


        } catch (e) {
            errorMessage(e)
        }
    });
}


var nots = [],
    lastindex = 0,
    moves = false;
var notification = (text, delayed) => {
    var mod = getModule("Notifications")
    if (getState(mod)) uithread(() => {
        try {
            var sett = getSettings(mod, "Show time", 0);
            var d;
            if (delayed == undefined) {
                d = sett
            } else {
                d = delayed
            }
            //var d = delayed != undefined ? sett : delay;
            lastindex++;
            nots.push({
                tick: d,
                gui: null,
                index: lastindex,
                pos: {
                    x: 0,
                    y: gs(dip2px(15)) + 30 + lastindex * gs(dip2px(30))
                }
            });
            var index1 = nots.length - 1;
            var index = nots[index1].index;
            //get previous

            /*if(nots.length > 1){
                 if(nots[index] != 0){
                     if(nots[index - 1].index == index) index = nots.length +1
                 }
            }*/

            /*if(nots.length > 2){
                if(nots[index - 1].index == index){
                    index = nots.length;
                }
            }*/
            var lay = new LinearLayout(ctx);
            lay.setOrientation(1);
            lay.setBackground(style.custom_corner("#2d2d2d", [20, 20, 0, 0, 0, 0, 20, 20]));

            var pbt = new android.widget.TextView(ctx);
            pbt.setText(android.text.Html.fromHtml(text));
            pbt.setTextColor(android.graphics.Color.WHITE);
            pbt.setTextSize(gs(17));
            pbt.setGravity(android.view.Gravity.CENTER);
            pbt.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            pbt.setPadding(10, 10, 10, 10);
            pbt.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            lay.addView(pbt);

            nots[index1].gui = new android.widget.PopupWindow(lay, -2, -2);
            nots[index1].gui.setTouchable(!!0);
            nots[index1].gui.setAnimationStyle(android.R.style.Animation_Translucent) //android.R.style.Animation_Toas
            nots[index1].gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, nots[index1].pos.y);
            nots[index1].gui.setTouchable(!!0);
        } catch (e) {
            errorMessage(e)
        }
    });
};
(() => {
    new java.lang.Thread(new java.lang.Runnable({
        run() {
            while (true) {
                uithread(() => {
                    if (nots.length != 0 && lastindex != 0) {
                        nots.forEach((e, i, a) => {
                            e.tick--;
                            if (e.tick <= 0 && e.gui != null) {
                                e.gui.dismiss();
                                e.gui = null;
                                nots.splice(0, 1);
                                moves = true;
                            };
                            /*if(e.pos.y > (gs(dip2px(15)) + 30 + e.index * gs(dip2px(30))) && a[0].index != 1){
                                a.forEach((entr,ind,arr) => {
                                    entr.pos.y = entr.pos.y - 1;
                                    entr.gui.update(0, entr.pos.y, -1, -1)
                                })
                            }*/
                        });
                        /*if(moves){
                            nots.forEach((e,i,a) => {
                                if (a[0].pos.y >(gs(dip2px(45)) + 30)) {
                                    if(i != 0) {e.pos.y = e.pos.y - 10;
                                    e.gui.update(0, e.pos.y, -1, -1)}
                                }else{
                                    moves = false;
                                };
                            });
                        }*/
                    } else {
                        lastindex = 0;
                    }
                })
                java.lang.Thread.sleep(50);
            }
        }
    })).start();
})();
var post = new android.widget.TextView(ctx);
var pos = () => {
    uithread(() => {
        try {
            post.setText(android.text.Html.fromHtml('<font color="red">X:</font> ' + Math.round(Player.getX()) + " <font color='red'>Y:</font> " + Math.round(Player.getY()) + " <font color='red'>Z:</font> " + Math.round(Player.getZ())));
            post.setTextColor(android.graphics.Color.WHITE);
            post.setTextSize(gs(17));
            post.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            post.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);

            pp = new android.widget.PopupWindow(post, -2, -2);
            pp.setTouchable(!!0);
            pp.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.BOTTOM, 15, 5);
            pp.setTouchable(!!0);

        } catch (e) {
            errorMessage(e)
        }
    });
};
var seekbarsetting = (setting) => {
    try {

        let thumb = new android.graphics.drawable.ShapeDrawable(new android.graphics.drawable.shapes.OvalShape());
        thumb.setColorFilter(-1, android.graphics.PorterDuff.Mode.SRC);
        thumb.setIntrinsicWidth(20);
        thumb.setIntrinsicHeight(20);

        let progress = new android.graphics.drawable.ShapeDrawable(new android.graphics.drawable.shapes.RectShape());
        //progress.setColorFilter(-1, android.graphics.PorterDuff.Mode.SRC_IN);
        //progress.setIntrinsicHeight(3); 
        progress.setColorFilter(-1, android.graphics.PorterDuff.Mode.SRC_ATOP);
        //progress.setIntrinsicWidth(500);
        progress.setIntrinsicHeight(3);




        var sett = setting.values;
        let p10 = gs(10);
        let p6 = gs(6);
        let lay = new LinearLayout(ctx);
        lay.setOrientation(1);
        lay.setPadding(p10, p6, p10, p6);

        let text = new TextView(ctx);
        text.setText(fromHtml("<font color='#e1e4eb'>" + setting.name + ": </font><font color='green'>" + sett[0] + "</font>"));
        text.setTextColor(android.graphics.Color.parseColor("#e1e4eb"));
        text.setTextSize(gs(15));
        text.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        text.setPadding(0, 0, 0, gs(4));
        text.setGravity(Gravity.LEFT);
        lay.addView(text);

        var seek = android.widget.SeekBar(ctx);
        seek.setMax(sett[2] / sett[1]);
        seek.setPadding(gs(3), 0, 0, 0);
        //seek.setThumb(thumb);
        seek.getThumb().setColorFilter(android.graphics.Color.parseColor("#e1e4eb"), android.graphics.PorterDuff.Mode.SRC_IN);
        seek.getProgressDrawable().setColorFilter(android.graphics.Color.parseColor("#626262"), android.graphics.PorterDuff.Mode.SRC);
        seek.setProgress(sett[0] / sett[1]);
        // seek.setProgressDrawable(progress);
        seek.setProgressTintList(new android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#e1e4eb")));
        seek.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function (seekBar, progress, fromUse) {

                text.setText(fromHtml(setting.name + ": <font color='green'>" + Math.round(progress * sett[1] * 100) / 100 + "</font>"));
                sett[0];
                //errorMessage(sett[0]);
            },
            onStopTrackingTouch: function (seek) {
                sett[0] = Math.round(seek.getProgress() * sett[1] * 100) / 100;
                //setting.values[0] = sett[0];
                //errorMessage(sett[0]);

            }
        }));
        lay.addView(seek);

        return lay
    } catch (e) {
        customMessage(e)
    }
};
var booleansetting = (setting) => {
    try {
        var sett = setting.values;
        let p10 = gs(10);
        let p6 = gs(6);

        let lay = new LinearLayout(ctx);
        lay.setOrientation(1);
        //lay.setBackground(style.custom_corner_color('#2b2b2b', gs(4), '#2a2a2a', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]))
        lay.setPadding(p10, p6, p10, p6);

        let text = new TextView(ctx);
        if (setting.values)
            text.setText(android.text.Html.fromHtml(setting.name + ': <font color="green">true</font>'))
        else
            text.setText(android.text.Html.fromHtml(setting.name + ': <font color="red">false</font>'));
        text.setTextColor(android.graphics.Color.parseColor("#e1e4eb"));
        text.setTextSize(gs(15));
        text.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        text.setPadding(0, 0, 0, gs(4));
        text.setGravity(Gravity.LEFT);
        text.setOnClickListener(new OnClickListener({
            onClick(v) {
                ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                setting.values = !setting.values;

                if (setting.values)
                    text.setText(android.text.Html.fromHtml(setting.name + ': <font color="green">true</font>'))
                else
                    text.setText(android.text.Html.fromHtml(setting.name + ': <font color="red">false</font>'));
            }
        }));
        lay.addView(text);
        return lay



    } catch (e) {
        errorMessage(e)
    }
};
var stringsetting = (setting) => {
    try {

        var sett = setting.values;
        let p10 = gs(10);
        let p6 = gs(6);
        let opened = false;

        let lay = new LinearLayout(ctx);
        lay.setOrientation(1);
        //lay.setBackground(style.custom_corner_color('#2b2b2b', gs(4), '#2a2a2a', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]))
        lay.setPadding(p10, p6, p10, p6);

        function chooser(parameter) {
            let btn = new android.widget.TextView(ctx);
            btn.setText(android.text.Html.fromHtml(sett[0] == parameter ? '<font color="yellow"><b>' + parameter + '</b></font>' : parameter));
            btn.setTextColor(android.graphics.Color.parseColor("#e1e4eb"));
            btn.setTextSize(sett[0] == parameter ? gs(15) : gs(13));
            btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            btn.setPadding(0, 0, 0, gs(3));
            btn.setGravity(Gravity.CENTER);
            btn.setOnClickListener(new OnClickListener({
                onClick(v) {
                    sett[0] = parameter;
                    text.setText(android.text.Html.fromHtml(setting.name + ': <font color="yellow">' + sett[0] + '</font>'));
                    //btn.setText(android.text.Html.fromHtml(sett[0] == parameter ? '<font color="yellow"><b>' + parameter + '</b></font>' : parameter));
                    lay.removeAllViews();
                    lay.addView(text);
                    sett.forEach((e, i) => {
                        if (i != 0) lay.addView(chooser(e))
                    });
                }
            }));
            return btn
        }

        let text = new TextView(ctx);
        text.setText(android.text.Html.fromHtml(setting.name + ': <font color="yellow">' + sett[0] + '</font>'))
        text.setTextColor(android.graphics.Color.parseColor("#e1e4eb"));
        text.setTextSize(gs(15));
        text.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        text.setPadding(0, 0, 0, gs(4));
        text.setGravity(Gravity.LEFT);
        text.setOnClickListener(new OnClickListener({
            onClick(v) {
                ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(10);
                //setting.values = !setting.values;
                opened = !opened;
                if (opened) {
                    sett.forEach((e, i) => {
                        if (i != 0) lay.addView(chooser(e))
                    });
                } else {
                    lay.removeAllViews();
                    lay.addView(text);
                }
            }
        }));
        lay.addView(text);
        return lay

    } catch (e) {
        errorMessage(e)
    }
};
var mainbg = () => {
    let bg = new android.graphics.drawable.GradientDrawable();
    bg.setColor(HSV([1, 100, 85]));
    return bg;
};
var blackbg = () => {
    let bg = new android.graphics.drawable.GradientDrawable();
    bg.setColor(HSV([0, 0, 0]));
    bg.setAlpha(220);
    return bg;
};



var x = 150,
    y = 100;
var sx = x;
var sy = y;

var settings = (mod) => {
    uithread(() => {
        try {

            let move = false;
            let dx = 0;
            let dy = 0;

            let lay = new android.widget.LinearLayout(ctx);
            lay.setOrientation(1);
            lay.setBackground(style.main());

            let params = new android.widget.LinearLayout.LayoutParams(-2, -2)
            params.setMargins(gs(dip2px(10)), gs(dip2px(5)), gs(dip2px(10)), gs(dip2px(5)));

            var name1 = mod.name[0][0];
            var name2 = mod.name[0].slice(1);

            let text_main = new android.widget.TextView(ctx);
            text_main.setText(android.text.Html.fromHtml('<font color="#d90000">' + name1 + '</font><font color="#ffffff">' + name2 + '</font>'));
            text_main.setTextColor(-1);
            text_main.setGravity(android.view.Gravity.CENTER);
            text_main.setLayoutParams(params);
            text_main.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            text_main.setTypeface(font);
            text_main.setTransformationMethod(null);
            text_main.setTextSize(gs(16));
            text_main.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function (view, motionEvent) {
                    try {
                        move = true;
                        if (!move) {
                            return false
                        };
                        switch (motionEvent.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                dx = sx - motionEvent.getRawX();
                                dy = sy - motionEvent.getRawY();
                                break;
                            case android.view.MotionEvent.ACTION_MOVE:
                                sx = (motionEvent.getRawX() + dx);
                                sy = (motionEvent.getRawY() + dy);
                                gui.update(sx, sy, -1, -1);
                                break;
                            case android.view.MotionEvent.ACTION_UP:
                                ;
                            case android.view.MotionEvent.ACTION_CANCEL:
                                move = false;
                                break
                        }
                    } catch (e) {};
                    return true
                }
            }));
            lay.addView(text_main);

            /* -LINE- */
            params = new android.widget.LinearLayout.LayoutParams(gs(dip2px(160)), gs(dip2px(2)));
            let line = new android.widget.LinearLayout(ctx);
            line.setBackgroundColor(android.graphics.Color.parseColor("#d90000"));
            line.setLayoutParams(params);
            lay.addView(line);

            params = new android.widget.LinearLayout.LayoutParams(-1, -2);
            let main = new android.widget.LinearLayout(ctx);
            main.setOrientation(1);
            main.setLayoutParams(params);
            main.setBackground(style.custom_corner("#2d2d2d", [0, 0, 0, 0, 0, 0, 0, 0]));
            lay.addView(main);

            let scroll = new android.widget.ScrollView(ctx);
            scroll.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
            scroll.getLayoutParams().setMargins(gs(4), gs(5), gs(4), gs(5))
            main.addView(scroll);

            let funct = new android.widget.LinearLayout(ctx);
            funct.setOrientation(1);
            funct.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
            funct.getLayoutParams().setMargins(gs(4), gs(5), gs(4), gs(5))
            scroll.addView(funct);

            if (mod.settings != 0) {
                mod.settings.forEach((e) => {
                    if (e.type == "int") {
                        funct.addView(seekbarsetting(e))
                    } else {
                        if (e.type == "bool") {
                            funct.addView(booleansetting(e))
                        } else {
                            funct.addView(stringsetting(e))
                        }
                    }
                })
            };

            params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2)));
            line = new android.widget.LinearLayout(ctx);
            line.setBackgroundColor(android.graphics.Color.parseColor("#d90000"));
            line.setLayoutParams(params);
            lay.addView(line);


            params = new android.widget.LinearLayout.LayoutParams(-2, -2)
            params.setMargins(gs(dip2px(10)), gs(dip2px(5)), gs(dip2px(10)), gs(dip2px(5)))
            text_main = new android.widget.TextView(ctx);
            if (mod.state[1])
                text_main.setText(android.text.Html.fromHtml('Bind: <font color="green">' + getBindState(mod) + '</font>'))
            else
                text_main.setText(android.text.Html.fromHtml('Bind: <font color="red">' + getBindState(mod) + '</font>'));
            text_main.setTextColor(-1);
            text_main.setSingleLine(true);
            text_main.setGravity(android.view.Gravity.CENTER);
            text_main.setLayoutParams(params);
            text_main.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            text_main.setBackground(style.custom_corner("#545454", [0, 0, 0, 0, 20, 20, 20, 20]));
            text_main.setTypeface(font);
            text_main.setTransformationMethod(null);
            text_main.setTextSize(gs(16));
            text_main.setOnClickListener(new OnClickListener({
                onClick(v) {
                    ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                    mod.state[1] = !mod.state[1];
                    if (mod.state[1])
                        bindbutton(mod);
                    else
                        mod.bind.dismiss();
                    if (mod.state[1])
                        text_main.setText(android.text.Html.fromHtml('Bind: <font color="green">' + getBindState(mod) + '</font>'))
                    else
                        text_main.setText(android.text.Html.fromHtml('Bind: <font color="red">' + getBindState(mod) + '</font>'));
                }
            }));

            lay.addView(text_main);




            var gui = new android.widget.PopupWindow(lay, -2, -2, true);
            gui.setAnimationStyle(android.R.style.Animation_Dialog);
            gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
            gui.update(sx, sy, -1, -1);

        } catch (e) {
            errorMessage(e + e.lineNumber)
        }
    })
};

// button
var button_popup = null;
var button_view = null;
var button = () => {
    uithread(() => {
        try {
            button_view = new android.widget.TextView(ctx);
            Halcyon.isDev ? button_view.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build ' + Halcyon.build + ' Dev</font>')) : button_view.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build ' + Halcyon.build + '</font>'));
            button_view.setTextColor(android.graphics.Color.WHITE);
            button_view.setTextSize(gs(17));
            button_view.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            button_view.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            button_view.setGravity(android.view.Gravity.CENTER);
            button_view.setOnClickListener(new OnClickListener({
                onClick(v) {
                    //close();
                    menu();
                }
            }));

            button_popup = new android.widget.PopupWindow(button_view, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            button_popup.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, gs(15), gs(5)); /////////////////////////////////////////////////
            //button_popup.setTouchable(!!0);
        } catch (e) {
            errorMessage(e)
        }
    });
}
var font = android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD);
var style = {
    custom_simple(color) {
        let bg = new android.graphics.drawable.GradientDrawable();
        bg.setColor(android.graphics.Color.parseColor(color));
        return bg;
    },
    custom_corner(color, corners) {
        let bg = new android.graphics.drawable.GradientDrawable();
        bg.setColor(android.graphics.Color.parseColor(color));
        bg.setCornerRadii([corners[0], corners[1], corners[2], corners[3], corners[4], corners[5], corners[6], corners[7]]);
        return bg;
    },
    custom_corner_color(color, size, color1, corners) {
        let bg = new android.graphics.drawable.GradientDrawable();
        bg.setColor(android.graphics.Color.parseColor(color));
        bg.setStroke(size, android.graphics.Color.parseColor(color1));
        bg.setCornerRadii([corners[0], corners[1], corners[2], corners[3], corners[4], corners[5], corners[6], corners[7]]);
        return bg;
    },
    main() {
        let bg = new android.graphics.drawable.GradientDrawable();
        bg.setColor(android.graphics.Color.parseColor("#545454"));
        bg.setCornerRadius(gs(20));
        return bg;
    },
    mainon() {
        let bg = new android.graphics.drawable.GradientDrawable();
        bg.setColor(android.graphics.Color.parseColor(maincolor));
        bg.setCornerRadius(20);
        return bg;
    }
}


var categories = [{
    name: "Combat",
    button: null,
    lay: null
}, {
    name: "Movement",
    button: null,
    lay: null
}, {
    name: "Player",
    button: null,
    lay: null
}, {
    name: "Misc.",
    button: null,
    lay: null
}];
var choosen = categories[0].name;

var dip2px = (dips) => {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

popup_menu = null;

var sbar = (mod) => {
    let blocked = ["NoVoid", "SafeDistance", "TPAura", "HitBoost", "AttackParticles", "Scaffold", "Tower", "TapTp", "ClickFriends", "FakeCam", "KillAura", "BunnyHop", "AutoClicker", "InfiniteAura", "Jesus"]

    let lay = new android.widget.LinearLayout(ctx);
    lay.setOrientation(0);
    lay.setPadding(gs(15), gs(15), gs(15), 0);
    lay.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-2, gs(dip2px(25) + 15)));

    let isblocked = false;
    blocked.forEach((e) => {
        if (e == mod.name[0]) isblocked = true;
    })


    let btn = new android.widget.TextView(ctx);
    btn.setText('[]');
    btn.setTextSize(gs(13));
    btn.setTextColor(0);
    btn.setPadding(gs(5), gs(5), gs(5), gs(1));
    btn.setBackground(mod.state[0] ? style.custom_corner_color('#a2a2a2', 4, '#a2a2a2', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]) : style.custom_corner_color('#2d2d2d', 4, '#a2a2a2', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]));
    btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(20)), gs(dip2px(20))));
    btn.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function (v) {
            if (!isblocked) {
                mod.state[0] = !mod.state[0];
                btn.setBackground(mod.state[0] ? style.custom_corner_color('#a2a2a2', 4, '#a2a2a2', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]) : style.custom_corner_color('#2d2d2d', 4, '#a2a2a2', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]));
                if (getCode(mod).hasOwnProperty('toggle')) getCode(mod).toggle();
                getState(mod) ? notification("<font color='green'>Enabled:</font> <font color='white'>" + mod.name[0] + "</font>") : notification("<font color='red'>Disabled:</font> <font color='white'>" + mod.name[0] + "</font>")
            } else {
                notification(ModPE.getLanguage() == "ru_RU" ? "Данный модуль не работаем в вашем лаунчере :(" : "This module doesn't working in your launcher :(");
            }
        }
    })); //notification(ModPE.getLanguage() == "ru_RU" ? "Длинное нажатие по кнопке в меню, откроет меню настроек для модуля!" : "A long press on the button in the menu will open the settings menu for the module!");
    if (!isblocked) btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
        onLongClick(v, t) {
            ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
            settings(mod);
            //mod.state[1] = !mod.state[1];
            //if (mod.state[1])
            //    bindbutton(mod);
            // else
            //     mod.bind.dismiss();
            return true;
        }
    }));
    lay.addView(btn);

    let lay1 = new android.widget.LinearLayout(ctx);
    lay1.setOrientation(1);
    lay1.setPadding(0, 0, 0, 5);



    let btn1 = new android.widget.TextView(ctx);
    btn1.setText(" " + mod.name[0]);
    //btn1.setTextSize(15);
    btn1.setTypeface(font);
    btn1.setTextColor(android.graphics.Color.parseColor(isblocked ? "#FF0000" : "#e1e4eb"));
    btn1.setGravity(android.view.Gravity.LEFT);
    btn1.setPadding(gs(3), gs(1), gs(1), gs(1));
    btn1.setSingleLine(false);
    btn1.setBackground(null);
    btn1.setTextSize(gs(14));
    btn1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
    btn1.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function (v) {
            if (!isblocked) {
                mod.state[0] = !mod.state[0];
                btn.setBackground(mod.state[0] ? style.custom_corner_color('#a2a2a2', 4, '#a2a2a2', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]) : style.custom_corner_color('#2d2d2d', 4, '#a2a2a2', [gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5), gs(5)]));
                if (getCode(mod).hasOwnProperty('toggle')) getCode(mod).toggle();
                getState(mod) ? notification("<font color='green'>Enabled:</font> <font color='white'>" + mod.name[0] + "</font>") : notification("<font color='red'>Disabled:</font> <font color='white'>" + mod.name[0] + "</font>")
            } else {
                notification(ModPE.getLanguage() == "ru_RU" ? "Данный модуль не работаем в вашем лаунчере :(" : "This module doesn't working in your launcher :(");
            }
        }
    }));
    if (!isblocked) btn1.setOnLongClickListener(new android.view.View.OnLongClickListener({
        onLongClick(v, t) {
            ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
            settings(mod);
            /*mod.state[1] = !mod.state[1];
            if (mod.state[1])
                bindbutton(mod);
            else
                mod.bind.dismiss();*/
            return true;
        }
    }));
    lay1.addView(btn1);
    lay.addView(lay1);
    //mod.width = btn1.getWidth();
    return lay;
};

var bindbutton = (module) => {
    ctx.runOnUiThread({
        run() {
            try {
                //let module = Halcyon.getModule(mod);
                //let state = Halcyon.getState(module);
                let move = false;
                let dx = 0;
                let dy = 0;
                let PosX = module.pos[0];
                let PosY = module.pos[1];
                var moving = false;

                //ctx.injectKeyEvent(100, 1)
                //ctx.injectKeyEvent(100, 0)

                let btn = new android.widget.TextView(ctx);
                btn.setText(module.name[1]);
                btn.setTextColor(-1);
                btn.setTextSize(gs(14));
                btn.setTransformationMethod(null);
                btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
                btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                btn.setBackground(module.state[0] ? style.mainon() : style.main());
                btn.setGravity(android.view.Gravity.CENTER);
                /*btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        module.state[0] = !module.state[0];
                        if (module.code.hasOwnProperty('toggle')) module.code.toggle();
                        btn.setBackground(module.state[0] ? style.mainon() : style.main());
                    }
                }));*/
                btn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function (view, motionEvent) {
                        try {
                            move = true;

                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    btn.setBackground(module.state[0] ? style.custom_corner("#a80000", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]) : style.custom_corner("#2d2d2d", [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    btn.setBackground(module.state[0] ? style.mainon() : style.main());
                                    if (!moving) {
                                        module.state[0] = !module.state[0];
                                        if (module.code.hasOwnProperty('toggle')) module.code.toggle();
                                        btn.setBackground(module.state[0] ? style.mainon() : style.main());
                                        getState(module) ? notification("<font color='green'>Enabled:</font> <font color='white'>" + module.name[0] + "</font>") : notification("<font color='red'>Disabled:</font> <font color='white'>" + module.name[0] + "</font>")
                                    };
                                    break;
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    break;
                            }

                            if (!move) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = PosX - motionEvent.getRawX();
                                    dy = PosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    if ((motionEvent.getRawX() + dx) - PosX >= 3 || (motionEvent.getRawX() + dx) - PosX <= -3 || (motionEvent.getRawY() + dy) - PosY >= 3 || (motionEvent.getRawY() + dy) - PosY <= -3) {
                                        moving = true;
                                        PosX = (motionEvent.getRawX() + dx);
                                        PosY = (motionEvent.getRawY() + dy);
                                        module.bind.update(PosX, PosY, -1, -1);
                                        module.pos[0] = PosX;
                                        module.pos[1] = PosY;
                                    }
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    move = false;
                                    moving = false
                                    break;
                            }
                        } catch (e) {
                            errorMessage(e);
                        }
                        return true;
                    }
                }));
                /*btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function (v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                        move = true;
                        return true;
                    }
                }));*/

                module.bind = new android.widget.PopupWindow(btn, gs(dip2px(45)), gs(dip2px(45)));
                module.bind.setAnimationStyle(android.R.style.Animation_Dialog);
                module.bind.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                module.bind.update(module.pos[0], module.pos[1], -1, -1)
            } catch (e) {
                errorMessage(e)
            }
        }
    })
}
//options mcpe
var optionsmcpe = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt");
var Options = {
    read: function () {
        var buff = new java.io.BufferedReader(new java.io.FileReader(optionsmcpe));
        var result = "";
        var str;
        while ((str = buff.readLine()) != null) result += str + "\n";
        return result;
    },
    get: function (name) {
        var result = null;
        try {
            var br = new java.io.BufferedReader(new java.io.FileReader(optionsmcpe));
            var str;
            while ((str = br.readLine()) != null) {
                if (str.split(":")[0] == name) result = str.split(":")[1];
            }
        } catch (e) {
            errorMessage(e)
        }
        return result;
    },

    set: function (name, value) {
        try {
            var text = this.read();
            text = text.replace(this.get(name), value);
            new java.io.FileOutputStream(optionsmcpe).write(new String(text).getBytes());
        } catch (e) {
            errorMessage(e)
        }
    },
    arr: function () {
        var funs = [];
        try {
            var text;
            var sp1 = (text = this.read()).split("\n");
            for (var i = 0; i < sp1.length - 1; i++) {
                funs.push(sp1[i].split(":")[0]);
            }
        } catch (e) {
            errorMessage(e);
        }
        return funs;
    }
};

//config list and fast unban and color changer
//cfg ---
var cfg = () => {
    try {
        const configpath = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon/configs");
        let lay = new LinearLayout(ctx);
        lay.setOrientation(1);

        var choosen = "";
        var arr = [];

        function getAllFiles(dir) {
            try {
                arr = [];
                dir.listFiles().forEach((e) => {
                    if (e.getName().indexOf(".cfg") != -1 && e.getName() != "default.cfg") {
                        arr.push(e.getName().replace(".cfg", ""));
                    }
                })
                //errorMessage(arr)
            } catch (e) {
                errorMessage(e)
            }
        };

        function configButton(name) {
            var cfgb = new TextView(ctx);
            cfgb.setText(fromHtml(choosen == name ? '<font color="green"><b>' + name + '</b></font>' : name));
            cfgb.setTextColor(android.graphics.Color.parseColor("#e1e4eb"));
            cfgb.setTextSize(gs(12));
            cfgb.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            cfgb.setGravity(Gravity.CENTER);
            cfgb.setPadding(0, 0, 0, gs(3));
            cfgb.setOnClickListener(new OnClickListener({
                onClick(v) {
                    choosen = name;
                    laylist.removeAllViews();
                    getAllFiles(configpath);
                    arr.forEach((e) => {
                        laylist.addView(configButton(e));
                    })
                    //laylist
                }
            }));
            return cfgb
        }

        let f1 = new android.graphics.drawable.GradientDrawable();
        f1.setColor(android.graphics.Color.parseColor('#545454'));
        f1.setCornerRadii([gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)])
        let text = new android.widget.TextView(ctx);
        text.setText("Configs");
        text.setTextColor(-1);
        text.setTextSize(gs(14));
        text.setPadding(gs(10), 0, 0, 0);
        text.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));

        lay.addView(text);

        let lay1 = new LinearLayout(ctx);
        lay1.setOrientation(0);
        lay1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(90))));
        lay1.getLayoutParams().setMargins(gs(10), gs(10), gs(10), gs(4));
        //lay1.setBackground(style.main());
        lay1.setBackground(style.custom_corner_color('#2b2b2b', 8, '#545454', [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]))
        lay.addView(lay1);

        let left = new android.widget.ScrollView(ctx);
        left.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1, 1.0));
        //left.setBackground(style.custom_corner_color('#2b2b2b', gs(8), '#545454', [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]))
        //left.setFillViewport(true);
        //left.setSmoothScrollingEnabled(true);
        //left.getLayoutParams().setMargins(0, 0, gs(2), 0);
        //left.setBackground(style.custom_corner_color('#2b2b2b', gs(8), '#545454', [gs(20), gs(20), gs(0), gs(0), gs(0), gs(0), gs(20), gs(20)]))
        lay1.addView(left);

        let line = new android.widget.LinearLayout(ctx);
        line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
        line.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(2)), -1));
        //line.getLayoutParams().setMargins(0,8,0,8);
        lay1.addView(line);

        let right = new LinearLayout(ctx);
        right.setOrientation(1);
        right.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1, 1));
        right.setBackground(f1);
        lay1.addView(right);



        //left
        let laylist = new LinearLayout(ctx);
        laylist.setOrientation(1);
        laylist.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
        laylist.getLayoutParams().setMargins(gs(10), 8, gs(10), 8);
        //laylist.setPadding(gs(10),gs(6),gs(10),gs(6));
        //laylist.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
        left.addView(laylist);

        getAllFiles(configpath);
        arr.forEach((e) => {
            laylist.addView(configButton(e));
            //left.smoothScrollTo(0,1000);
        });

        //for right
        let save = new android.widget.TextView(ctx);
        save.setText("Save");
        save.setTextColor(-1);
        save.setTextSize(gs(14));
        save.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        save.setGravity(android.view.Gravity.CENTER);
        save.setPadding(0, gs(10), 0, gs(10));
        save.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1, 1));
        save.setOnClickListener(new android.view.View.OnClickListener({
            onClick(v) {
                if (edittext.getText() != "" || choosen != "") {
                    if (edittext.getText() != "" && choosen == "") {
                        config.create(edittext.getText());
                    }
                    if (choosen != "") {
                        config.create(choosen);
                    }
                    //errorMessage('Config "' + edittext.getText() + '" saved!');
                    notification("<font color='green'>Success!</font> <font color='white'>Config '" + edittext.getText() + "' saved!</font>")
                    choosen = "";
                    laylist.removeAllViews();
                    getAllFiles(configpath);
                    arr.forEach((e) => {
                        laylist.addView(configButton(e));
                    });

                } else {
                    //errorMessage('Please, enter a valid name!')
                    notification("<font color='red'>Error!</font> <font color='white'>Please, enter a valid name!</font>")
                };
            }
        }));
        right.addView(save);

        line = new android.widget.LinearLayout(ctx);
        line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
        line.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2))));
        right.addView(line);


        let load = new android.widget.TextView(ctx);
        load.setText("Load");
        load.setTextColor(-1);
        load.setTextSize(gs(14));
        load.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        load.setGravity(android.view.Gravity.CENTER);
        load.setPadding(0, gs(10), 0, gs(10));
        load.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1, 1));
        load.setOnClickListener(new android.view.View.OnClickListener({
            onClick(v) {
                if (choosen != "") {
                    config.load(choosen);
                    //errorMessage('Config "' + edittext.getText() + '" loaded!');
                    notification("<font color='green'>Success!</font> <font color='white'>Config '" + edittext.getText() + "' loaded!</font>")
                    choosen = "";
                    laylist.removeAllViews();
                    getAllFiles(configpath);
                    arr.forEach((e) => {
                        laylist.addView(configButton(e));
                    });
                } else {
                    notification("<font color='red'>Error!</font> <font color='white'>Please, enter a valid name!</font>")
                }
            }
        }));
        right.addView(load);

        line = new android.widget.LinearLayout(ctx);
        line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
        line.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2))));
        right.addView(line);


        let delet = new android.widget.TextView(ctx);
        delet.setText("Delete");
        delet.setTextColor(-1);
        delet.setTextSize(gs(14));
        delet.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        delet.setGravity(android.view.Gravity.CENTER);
        delet.setPadding(0, gs(10), 0, gs(10));
        delet.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1, 1));
        delet.setOnClickListener(new android.view.View.OnClickListener({
            onClick(v) {
                if (choosen != "") {
                    //var a = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon/configs", choosen);
                    //a.delete();
                    var a = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon/configs/" + choosen + ".cfg");
                    a.delete()
                    choosen = "";
                    laylist.removeAllViews();
                    getAllFiles(configpath);
                    arr.forEach((e) => {
                        laylist.addView(configButton(e));
                    })
                }
            }
        }));
        right.addView(delet);

        let edittext = new android.widget.EditText(ctx);
        edittext.setHint("New config name");
        edittext.setHintTextColor(Color.parseColor("#a0a0a0"));
        edittext.setTextColor(-1);
        edittext.setTextSize(gs(14));
        edittext.setPadding(gs(10), 0, 0, 0);
        edittext.setFocusable(true);
        edittext.setOnClickListener(new android.view.View.OnClickListener({
            onClick(v) {
                // ctx.getSystemService(android.content.Context.INPUT_METHOD_SERVICE).toggleSoftInput(android.view.inputmethod.InputMethodManager.SHOW_FORCED, 0);
                //ctx.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);
            }
        })); ///onFocusChanged

        //edittext.setGravity(android.view.Gravity.CENTER);
        edittext.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(30))));
        edittext.getLayoutParams().setMargins(gs(10), gs(8), gs(10), gs(4));
        edittext.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        edittext.setBackground(style.custom_corner_color("#2d2d2d", 4, '#a2a2a2', [gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20), gs(20)]));
        lay.addView(edittext);



        return lay;
    } catch (e) {
        errorMessage(e)
    }
}
//unban ---
var rest = () => {
    try {
        let alarmManager = ctx.getSystemService("alarm"),
            intent = ctx.getPackageManager().getLaunchIntentForPackage(ctx.getPackageName());
        intent.addFlags(335544320);
        alarmManager.set(3, android.os.SystemClock.elapsedRealtime() + 500, android.app.PendingIntent.getActivity(ctx, 0, intent, 0));
        new java.io.File(ctx.getFilesDir() + "/running.lock").delete();
        new java.lang.Thread({
            run() {
                java.lang.Thread.sleep(500);
                java.lang.System.exit(0);
            }
        }).start();
    } catch (e) {}
}
var unban = () => {
    let lay = new LinearLayout(ctx);
    lay.setOrientation(1);

    let text = new android.widget.TextView(ctx);
    text.setText("Fast Unban (CID)");
    text.setTextColor(-1);
    text.setTextSize(gs(14));
    text.setPadding(gs(10), 0, 0, 0);
    text.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));

    lay.addView(text);

    var params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(30)));
    params.setMargins(gs(10), gs(4), gs(10), 0);

    let unban = new android.widget.TextView(ctx);
    unban.setText("Unban");
    unban.setTextColor(-1);
    unban.setTextSize(gs(14));
    //save.setPadding(gs(10),0,0,0);
    unban.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
    unban.setBackground(style.main());
    unban.setGravity(android.view.Gravity.CENTER);
    unban.setLayoutParams(params);
    //save.getLayoutParams().setMargins(0,0,gs(dip2px(1)),0);
    unban.setOnClickListener(new android.view.View.OnClickListener({
        onClick(v) {
            try {
                var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/clientId.txt");
                file.delete();
                var hash = "xxxxxxxx".replace(/[xy]/g, ((e) => {
                    var t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8)
                        .toString(16)
                }));
                // Options.set("mp_username", "H_" + hash);
                print("Restart your launcher.");
                rest()
            } catch (e) {
                errorMessage(e)
            }
        }
    }));
    lay.addView(unban);

    return lay
}
//color ---
var maincolor = "#FF0000";
var maincolor_hsv = 0;
var maincolor_hsv_saturation = 96;
var maincolor_hsv_h = 87;
var HSVtoRGB = (h, s, v) => {
    try {
        var r, g, b, i, f, p, q, t;
        //if (arguments.length === 1) {
        //    s = h.s, v = h.v, h = h.h;
        // }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    } catch (e) {
        errorMessage(e)
    }
}
var updatecolors = () => {
    text_main.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build ' + Halcyon.build + '</font>'))
    post.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">X:</font> ' + Math.round(Player.getX()) + ' <font color="' + maincolor + '">Y:</font> ' + Math.round(Player.getY()) + ' <font color="' + maincolor + '">Z:</font> ' + Math.round(Player.getZ())));
    button_view.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build ' + Halcyon.build + '</font>'));
};
var colorchanger = () => {
    try {
        let bg = new android.graphics.drawable.GradientDrawable();
        bg.setColor(parseColor(maincolor));
        bg.setCornerRadius(20);
        let bg1 = new android.graphics.drawable.GradientDrawable();
        bg1.setColor(HSV([0, maincolor_hsv_saturation, 0]))
        bg1.setCornerRadius(20);
        let bg2 = new android.graphics.drawable.GradientDrawable();
        bg2.setColor(HSV([0, 0, maincolor_hsv_h]));
        bg2.setCornerRadius(20);
        let lay = new LinearLayout(ctx);
        lay.setOrientation(1);

        let text = new android.widget.TextView(ctx);
        text.setText("Color");
        text.setTextColor(-1);
        text.setTextSize(gs(14));
        text.setPadding(gs(10), 0, 0, 0);
        text.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));

        lay.addView(text);

        var params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(30)));
        params.setMargins(gs(10), gs(4), gs(10), gs(4));

        let lay1 = new LinearLayout(ctx);
        lay1.setOrientation(0);
        lay1.setLayoutParams(params)
        lay.addView(lay1);

        var test = new TextView(ctx);
        test.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(20)), gs(dip2px(20))));
        test.setBackground(bg);
        test.setText("H");
        test.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        test.setTextSize(gs(12));
        //test.setPadding(10,10,10,10);
        test.setGravity(android.view.Gravity.CENTER)
        test.setTextColor(-1);
        test.getLayoutParams().setMargins(gs(7), 0, 0, 0);
        test.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
        lay1.addView(test);

        var seek = new android.widget.SeekBar(ctx);
        seek.setMax(360);
        seek.getThumb().setColorFilter(android.graphics.Color.parseColor("#e1e4eb"), android.graphics.PorterDuff.Mode.SRC_IN);
        //seek.getProgressDrawable().setColorFilter(android.graphics.Color.parseColor("#626262"), android.graphics.PorterDuff.Mode.SRC_OUT);
        seek.setProgress(maincolor_hsv);
        seek.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
        seek.setProgressTintList(new android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#e1e4eb")));
        seek.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function (seekBar, progress, fromUse) {
                maincolor = hsv2hex(progress, maincolor_hsv_saturation, maincolor_hsv_h);
                maincolor_hsv = progress;

                bg.setColor(parseColor(maincolor));
                test.setBackground(bg);
                updatecolors();
            }
        }));
        lay1.addView(seek);


        let lay2 = new LinearLayout(ctx);
        lay2.setOrientation(0);
        lay2.setLayoutParams(params)
        lay.addView(lay2);

        var test1 = new TextView(ctx);
        test1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(20)), gs(dip2px(20))));
        test1.setBackground(bg1);
        test1.setText("S");
        test1.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        test1.setTextSize(gs(12));
        //test.setPadding(10,10,10,10);
        test1.setGravity(android.view.Gravity.CENTER)
        test1.setTextColor(-1);
        test1.getLayoutParams().setMargins(gs(7), 0, 0, 0);
        test1.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
        lay2.addView(test1);

        var seek1 = new android.widget.SeekBar(ctx);
        seek1.setMax(100);
        seek1.getThumb().setColorFilter(android.graphics.Color.parseColor("#e1e4eb"), android.graphics.PorterDuff.Mode.SRC_IN);
        //seek.getProgressDrawable().setColorFilter(android.graphics.Color.parseColor("#626262"), android.graphics.PorterDuff.Mode.SRC_OUT);
        seek1.setProgress(maincolor_hsv_saturation);
        seek1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
        seek1.setProgressTintList(new android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#e1e4eb")));
        seek1.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function (seekBar, progress, fromUse) {
                //maincolor = hsv2hex(progress);
                maincolor = hsv2hex(maincolor_hsv, progress, maincolor_hsv_h);
                maincolor_hsv_saturation = progress;
                bg1.setColor(HSV([0, maincolor_hsv_saturation, 0]));
                test1.setBackground(bg1);

                bg.setColor(parseColor(maincolor));
                test.setBackground(bg);
                updatecolors();
            }
        }));
        lay2.addView(seek1);


        let lay3 = new LinearLayout(ctx);
        lay3.setOrientation(0);
        lay3.setLayoutParams(params)
        lay.addView(lay3);

        var test2 = new TextView(ctx);
        test2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(20)), gs(dip2px(20))));
        test2.setBackground(bg2);
        test2.setText("V");
        test2.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
        test2.setTextSize(gs(12));
        //test.setPadding(10,10,10,10);
        test2.setGravity(android.view.Gravity.CENTER)
        test2.setTextColor(-1);
        test2.getLayoutParams().setMargins(gs(7), 0, 0, 0);
        test2.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
        lay3.addView(test2);

        var seek2 = new android.widget.SeekBar(ctx);
        seek2.setMax(100);
        seek2.getThumb().setColorFilter(android.graphics.Color.parseColor("#e1e4eb"), android.graphics.PorterDuff.Mode.SRC_IN);
        //seek.getProgressDrawable().setColorFilter(android.graphics.Color.parseColor("#626262"), android.graphics.PorterDuff.Mode.SRC_OUT);
        seek2.setProgress(maincolor_hsv_h);
        seek2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
        seek2.setProgressTintList(new android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#e1e4eb")));
        seek2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function (seekBar, progress, fromUse) {
                //maincolor = hsv2hex(progress);
                maincolor = hsv2hex(maincolor_hsv, maincolor_hsv_saturation, progress);
                maincolor_hsv_h = progress;
                bg2.setColor(HSV([0, 0, maincolor_hsv_h]));
                test2.setBackground(bg2);

                bg.setColor(parseColor(maincolor));
                test.setBackground(bg);
                updatecolors();
            }
        }));
        lay3.addView(seek2);


        return lay;
    } catch (e) {
        errorMessage(e)
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var hsv2hex = (color, saturation, h) => {
    var hsv_array = HSVtoRGB(color / 360, saturation / 100, h / 100);
    return rgbToHex(hsv_array.r, hsv_array.g, hsv_array.b)
}

// menu
var lay = new android.widget.LinearLayout(ctx);
var anim = new android.view.animation.ScaleAnimation(0, 1, 0, 1, gs(dip2px(162)), gs(dip2px(149))); //android.view.animation.TranslateAnimation(0, 500, 0, 400);
anim.setDuration(200);
anim.setFillAfter(true);

var text_main;
var opn = false;
var menu = () => {
    uithread(() => {
        try {
            let move = false;
            let dx = 0;
            let dy = 0;

            var pushed = 0;

            var nlay = new LinearLayout(ctx);



            lay = new android.widget.LinearLayout(ctx);
            lay.setOrientation(1);
            lay.setBackground(style.main());
            nlay.addView(lay);

            let params = new android.widget.LinearLayout.LayoutParams(-2, -2)
            params.setMargins(gs(dip2px(10)), gs(dip2px(5)), gs(dip2px(10)), gs(dip2px(5)));

            text_main = new android.widget.TextView(ctx);
            //Halcyon.isDev ? text_main.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build 7 Dev</font>')) : text_main.setText(android.text.Html.fromHtml('<font color="#d90000">H</font><font color="#ffffff">alcyon - build 7 Alpha</font>'))
            //text_main.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build '+Halcyon.build+'</font>'))
            Halcyon.isDev ? text_main.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build ' + Halcyon.build + ' Dev</font>')) : text_main.setText(android.text.Html.fromHtml('<font color="' + maincolor + '">H</font><font color="#ffffff">alcyon - build ' + Halcyon.build + '</font>'));
            text_main.setTextColor(-1);
            text_main.setGravity(android.view.Gravity.CENTER);
            text_main.setLayoutParams(params);
            text_main.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            text_main.setTypeface(font);
            text_main.setTransformationMethod(null);
            text_main.setTextSize(gs(16));
            text_main.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function (view, motionEvent) {
                    try {
                        move = true;
                        if (!move) {
                            return false
                        };
                        switch (motionEvent.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                dx = x - motionEvent.getRawX();
                                dy = y - motionEvent.getRawY();
                                break;
                            case android.view.MotionEvent.ACTION_MOVE:
                                x = (motionEvent.getRawX() + dx);
                                y = (motionEvent.getRawY() + dy);
                                popup_menu.update(x, y, -1, -1);
                                break;
                            case android.view.MotionEvent.ACTION_UP:
                                ;
                            case android.view.MotionEvent.ACTION_CANCEL:
                                move = false;
                                break
                        }
                    } catch (e) {};
                    return true
                }
            }));
            text_main.setOnLongClickListener(new android.view.View.OnLongClickListener({
                onLongClick: function (view) {
                    popup_menu.update(x, y, -1, -1);
                    return true;
                }
            }));
            lay.addView(text_main);

            /* -LINE- */
            params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2)));
            let line = new android.widget.LinearLayout(ctx);
            line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
            line.setLayoutParams(params);
            lay.addView(line);

            params = new android.widget.LinearLayout.LayoutParams(-2, -2);
            let main = new android.widget.LinearLayout(ctx);
            main.setOrientation(1);
            main.setLayoutParams(params);
            main.setBackground(style.custom_corner("#2d2d2d", [0, 0, 0, 0, 0, 0, 0, 0]));
            lay.addView(main);

            // ----------------------------------------------------------------- Категории, горизонтально

            params = new android.widget.LinearLayout.LayoutParams(-2, gs(dip2px(65)));
            let категории = new android.widget.LinearLayout(ctx);
            категории.setOrientation(0);
            категории.setLayoutParams(params);
            main.addView(категории);

            params = new android.widget.LinearLayout.LayoutParams(-2, gs(dip2px(65))); //params for all



            let c = new android.widget.LinearLayout(ctx); //combat
            c.setOrientation(1);
            c.setLayoutParams(params);
            c.setBackground(choosen == "Combat" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));

            let m = new android.widget.LinearLayout(ctx); //Movement
            m.setOrientation(1);
            m.setLayoutParams(params);
            m.setBackground(choosen == "Movement" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));

            let p = new android.widget.LinearLayout(ctx); //Player
            p.setOrientation(1);
            p.setLayoutParams(params);
            p.setBackground(choosen == "Player" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));

            let ms = new android.widget.LinearLayout(ctx); //Misc
            ms.setOrientation(1);
            ms.setLayoutParams(params);
            ms.setBackground(choosen == "Misc" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));


            let o = new android.widget.LinearLayout(ctx); //Misc
            o.setOrientation(1);
            o.setLayoutParams(params);
            o.setBackground(choosen == "Other" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));

            категории.addView(c);
            категории.addView(m);
            категории.addView(p);
            категории.addView(ms);
            категории.addView(o);


            let c_txt = new android.widget.LinearLayout(ctx); //combat
            c_txt.setOrientation(1);
            c_txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(65)), -1));
            c_txt.setBackground(choosen == "Combat" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));
            c.addView(c_txt);

            var c_icon = new android.widget.TextView(ctx);
            c_icon.setText("a");
            c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
            c_icon.setTypeface(ifont);
            c_icon.setTransformationMethod(null);
            c_icon.setTextSize(gs(38));
            c_icon.setGravity(android.view.Gravity.CENTER);
            c_icon.setPadding(0, gs(20), 0, gs(3));
            c_icon.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            c_icon.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {


                    choosen = "Combat";
                    c_txt.setBackground(style.custom_simple(maincolor));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            c_txt.addView(c_icon);

            var c_name = new android.widget.TextView(ctx);
            c_name.setText("Combat");
            c_name.setTextColor(android.graphics.Color.parseColor('#a2a2a2'));
            c_name.setTypeface(font);
            c_name.setTransformationMethod(null);
            c_name.setTextSize(gs(10));
            c_name.setPadding(0, 0, 0, gs(5));
            c_name.setGravity(android.view.Gravity.CENTER);
            c_name.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            c_name.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Combat";
                    c_txt.setBackground(style.custom_simple(maincolor));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            c_txt.addView(c_name);

            let m_txt = new android.widget.LinearLayout(ctx); //combat
            m_txt.setOrientation(1);
            m_txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(65)), -1));
            m_txt.setBackground(choosen == "Movement" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));
            m.addView(m_txt);

            var m_icon = new android.widget.TextView(ctx);
            m_icon.setText("b");
            m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
            m_icon.setTypeface(ifont);
            m_icon.setTransformationMethod(null);
            m_icon.setTextSize(gs(38));
            m_icon.setGravity(android.view.Gravity.CENTER);
            m_icon.setPadding(0, gs(20), 0, gs(3));
            m_icon.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            m_icon.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Movement";
                    m_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            m_txt.addView(m_icon);

            var m_name = new android.widget.TextView(ctx);
            m_name.setText("Movement");
            m_name.setTextColor(android.graphics.Color.parseColor('#a2a2a2'));
            m_name.setTypeface(font);
            m_name.setTransformationMethod(null);
            m_name.setTextSize(gs(10));
            m_name.setPadding(0, 0, 0, gs(5));
            m_name.setGravity(android.view.Gravity.CENTER);
            m_name.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            m_icon.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Movement";
                    m_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            m_txt.addView(m_name);

            let p_txt = new android.widget.LinearLayout(ctx); //combat
            p_txt.setOrientation(1);
            p_txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(65)), -1));
            p_txt.setBackground(choosen == "Player" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));
            p.addView(p_txt);

            var p_icon = new android.widget.TextView(ctx);
            p_icon.setText("c");
            p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
            p_icon.setTypeface(ifont);
            p_icon.setTransformationMethod(null);
            p_icon.setTextSize(gs(38));
            p_icon.setGravity(android.view.Gravity.CENTER);
            p_icon.setPadding(0, gs(20), 0, gs(3));
            p_icon.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            p_icon.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Player";
                    p_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            p_txt.addView(p_icon);

            var p_name = new android.widget.TextView(ctx);
            p_name.setText("Player");
            p_name.setTextColor(android.graphics.Color.parseColor('#a2a2a2'));
            p_name.setTypeface(font);
            p_name.setTransformationMethod(null);
            p_name.setTextSize(gs(10));
            p_name.setPadding(0, 0, 0, gs(5));
            p_name.setGravity(android.view.Gravity.CENTER);
            p_name.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            p_name.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Player";
                    p_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            p_txt.addView(p_name);

            let ms_txt = new android.widget.LinearLayout(ctx); //combat
            ms_txt.setOrientation(1);
            ms_txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(65)), -1));
            ms_txt.setBackground(choosen == "Misc" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));
            ms.addView(ms_txt);

            var ms_icon = new android.widget.TextView(ctx);
            ms_icon.setText("e");
            ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
            ms_icon.setTypeface(ifont);
            ms_icon.setTransformationMethod(null);
            ms_icon.setTextSize(gs(38));
            ms_icon.setGravity(android.view.Gravity.CENTER);
            ms_icon.setPadding(0, gs(20), 0, gs(3));
            ms_icon.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            ms_icon.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Misc";
                    ms_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            ms_txt.addView(ms_icon);

            var ms_name = new android.widget.TextView(ctx);
            ms_name.setText("Misc");
            ms_name.setTextColor(android.graphics.Color.parseColor('#a2a2a2'));
            ms_name.setTypeface(font);
            ms_name.setTransformationMethod(null);
            ms_name.setTextSize(gs(10));
            ms_name.setPadding(0, 0, 0, gs(5));
            ms_name.setGravity(android.view.Gravity.CENTER);
            ms_name.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            ms_name.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Misc";
                    ms_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);
                }
            }));
            ms_txt.addView(ms_name);






            let o_txt = new android.widget.LinearLayout(ctx); //other
            o_txt.setOrientation(1);
            o_txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(65)), -1));
            o_txt.setBackground(choosen == "Other" ? style.custom_simple(maincolor) : style.custom_simple("#373737"));
            o.addView(o_txt);

            var o_icon = new android.widget.TextView(ctx);
            o_icon.setText("d");
            o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
            o_icon.setTypeface(ifont);
            o_icon.setTransformationMethod(null);
            o_icon.setTextSize(gs(38));
            o_icon.setGravity(android.view.Gravity.CENTER);
            o_icon.setPadding(0, gs(20), 0, gs(3));
            o_icon.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            o_icon.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Other";
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    o_txt.setBackground(style.custom_simple(maincolor));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    //o_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);

                }
            }));
            o_txt.addView(o_icon);

            var o_name = new android.widget.TextView(ctx);
            o_name.setText("Other");
            o_name.setTextColor(android.graphics.Color.parseColor('#a2a2a2'));
            o_name.setTypeface(font);
            o_name.setTransformationMethod(null);
            o_name.setTextSize(gs(10));
            o_name.setPadding(0, 0, 0, gs(5));
            o_name.setGravity(android.view.Gravity.CENTER);
            o_name.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            o_name.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function (v) {
                    choosen = "Other";
                    o_txt.setBackground(style.custom_simple(maincolor));
                    ms_txt.setBackground(style.custom_simple("#373737"));
                    c_txt.setBackground(style.custom_simple("#373737"));
                    p_txt.setBackground(style.custom_simple("#373737"));
                    m_txt.setBackground(style.custom_simple("#373737"));
                    c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
                    m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
                    p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
                    ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
                    o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
                    pushmodstolay(choosen);

                }
            }));
            o_txt.addView(o_name);

            c_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
            m_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
            p_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
            ms_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
            o_icon.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));
            c_name.setTextColor(android.graphics.Color.parseColor(choosen == "Combat" ? '#ffffff' : '#a2a2a2'));
            m_name.setTextColor(android.graphics.Color.parseColor(choosen == "Movement" ? '#ffffff' : '#a2a2a2'));
            p_name.setTextColor(android.graphics.Color.parseColor(choosen == "Player" ? '#ffffff' : '#a2a2a2'));
            ms_name.setTextColor(android.graphics.Color.parseColor(choosen == "Misc" ? '#ffffff' : '#a2a2a2'));
            o_name.setTextColor(android.graphics.Color.parseColor(choosen == "Other" ? '#ffffff' : '#a2a2a2'));

            /* -LINE- */
            params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2)));
            line = new android.widget.LinearLayout(ctx);
            line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
            line.setLayoutParams(params);
            main.addView(line);
            /* -LINE- */

            // -----------------------------------------------------------------




            //Scale

            let layscale0 = new LinearLayout(ctx);
            layscale0.setOrientation(1);
            main.addView(layscale0);

            let p10 = gs(10);
            let p6 = gs(6);
            let layscale = new LinearLayout(ctx);
            layscale.setOrientation(0);
            layscale.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
            layscale.setPadding(p10, p6, p10, p6);
            layscale0.addView(layscale);

            line = new android.widget.LinearLayout(ctx);
            line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
            line.setLayoutParams(params);
            layscale0.addView(line)



            let textsc = new TextView(ctx);
            textsc.setText(fromHtml("<font color='#e1e4eb'>Scale: </font><font color='green'>" + parseFloat(scale.toFixed(1)) + "</font>"));
            textsc.setTextColor(android.graphics.Color.parseColor("#e1e4eb"));
            textsc.setTextSize(gs(15));
            textsc.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            textsc.setPadding(0, 0, gs(4), 0);
            textsc.setGravity(Gravity.LEFT);
            layscale.addView(textsc);

            var seeksc = android.widget.SeekBar(ctx);
            seeksc.setMax(20);
            seeksc.setMin(5);
            seeksc.setPadding(gs(3), 0, 0, 0);
            seeksc.getThumb().setColorFilter(android.graphics.Color.parseColor("#e1e4eb"), android.graphics.PorterDuff.Mode.SRC_IN);
            //seek.getProgressDrawable().setColorFilter(android.graphics.Color.parseColor("#626262"), android.graphics.PorterDuff.Mode.SRC_OUT);
            seeksc.setProgress(Math.round(scale * 10));
            seeksc.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2))
            seeksc.setProgressTintList(new android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#e1e4eb")));
            seeksc.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
                onProgressChanged: function (seekBar, progress, fromUse) {
                    textsc.setText(fromHtml("<font color='#e1e4eb'>Scale: </font><font color='green'>" + parseFloat(progress / 10) + "</font>"));
                    // textsc.setText(fromHtml(setting.name + ": <font color='green'>" + Math.round(progress * sett[1] * 100) / 100 + "</font>"));
                    scale = parseFloat(progress / 10);
                    //errorMessage(sett[0]);
                    popup_menu.update();
                },
                onStopTrackingTouch: function (seek) {
                    //sett[0] = Math.round(seek.getProgress() * sett[1] * 100) / 100;
                    scale = parseFloat(seek.getProgress() / 10);
                    var input = "scale:" + scale + "\n";
                    filemanager.rewrite(new java.io.File(config.dir, "main.ini"), input);
                    //setting.values[0] = sett[0];
                    //errorMessage(sett[0]);

                }
            }));
            layscale.addView(seeksc);


            /* -BOTTOM-*/




            let scroll = new android.widget.ScrollView(ctx);
            scroll.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(323)), gs(dip2px(210))));
            scroll.getLayoutParams().setMargins(gs(4), gs(5), gs(4), gs(5));
            //scroll.setBottomEdgeEffectColor(0);
            main.addView(scroll);

            let funct = new android.widget.LinearLayout(ctx);
            funct.setOrientation(0);
            funct.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(323)), gs(dip2px(210))));
            funct.getLayoutParams().setMargins(gs(4), gs(5), gs(4), gs(5))
            scroll.addView(funct);

            let leftlay = new android.widget.LinearLayout(ctx);
            leftlay.setOrientation(1);
            leftlay.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(162)), -2));
            //leftlay.getLayoutParams().setMargins(gs(4), gs(5), gs(4), gs(5))
            funct.addView(leftlay);

            let rightlay = new android.widget.LinearLayout(ctx);
            rightlay.setOrientation(1);
            rightlay.setLayoutParams(new android.widget.LinearLayout.LayoutParams(gs(dip2px(162)), -2));
            //leftlay.getLayoutParams().setMargins(gs(4), gs(5), gs(4), gs(5))
            funct.addView(rightlay);




            var pushmodstolay = (category) => {
                rightlay.removeAllViews();
                leftlay.removeAllViews();
                funct.removeAllViews();
                //layscale0.removeAllViews();
                pushed = 0;
                if (category == "Other") {
                    funct.setOrientation(1);
                    funct.addView(cfg());
                    funct.addView(unban());
                    //layscale0.addView(layscale);
                    //layscale0.addView(line)
                    //funct.addView(colorchanger());
                    //funct.addView(cfg());
                } else {

                    funct.setOrientation(0);
                    funct.addView(leftlay);
                    funct.addView(rightlay);
                    Halcyon.mods.forEach(function (entry) {
                        if (entry.category == category) {
                            if (pushed == 0) {
                                leftlay.addView(sbar(entry));
                                pushed++;
                            } else {
                                pushed = 0;
                                rightlay.addView(sbar(entry));
                            }
                        }
                    });
                }
            };

            /*if (choosen == "Other") {
                funct.addView(cfg());
                funct.addView(unban());
            };

            Halcyon.mods.forEach(function (entry) {
                if (entry.category == choosen) {
                    funct.addView(sbar(entry));
                }
            });*/
            pushmodstolay(choosen);

            /* -LINE- */
            params = new android.widget.LinearLayout.LayoutParams(-1, gs(dip2px(2)));
            line = new android.widget.LinearLayout(ctx);
            line.setBackgroundColor(android.graphics.Color.parseColor(maincolor));
            line.setLayoutParams(params);
            lay.addView(line);

            params = new android.widget.LinearLayout.LayoutParams(-2, -2)
            params.setMargins(gs(dip2px(10)), gs(dip2px(5)), gs(dip2px(10)), gs(dip2px(5)))
            var text_main1 = new android.widget.TextView(ctx);
            text_main1.setText(android.text.Html.fromHtml('Vk.com/nofairplay'));
            text_main1.setTextColor(-1);
            text_main1.setSingleLine(true);
            text_main1.setGravity(android.view.Gravity.CENTER);
            text_main1.setLayoutParams(params);
            text_main1.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);
            text_main1.setBackground(style.custom_corner("#545454", [0, 0, 0, 0, 20, 20, 20, 20]));
            text_main1.setTypeface(font);
            text_main1.setTransformationMethod(null);
            text_main1.setTextSize(gs(16));
            text_main1.setOnClickListener(new android.view.View.OnClickListener({
                onClick(view) {
                    ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(100);
                    let Intent = android.content.Intent;
                    let intentURL = new Intent(ctx);
                    intentURL.setAction(android.content.Intent.ACTION_VIEW);
                    intentURL.setData(android.net.Uri.parse("https://vk.com/nofairplay"));
                    ctx.startActivity(intentURL);
                    notification("Transfered to official group!");
                }
            }));
            lay.addView(text_main1);

            popup_menu = new android.widget.PopupWindow(nlay, -2, -2, true);
            popup_menu.setFocusable(true);
            popup_menu.setAnimationStyle(android.R.style.Animation_Dialog);
            popup_menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, gs(100), gs(75));
            popup_menu.update(x, y, -1, -1);
            popup_menu.setOnDismissListener(new android.widget.PopupWindow.OnDismissListener({
                onDismiss() {
                    //lay.startAnimation(anim1);
                    opn = true;
                }
                //lay.startAnimation(anim1);
            }))
            lay.startAnimation(anim);
            //opn = true;


        } catch (e) {
            errorMessage(e)
        }
    });
}

// close
var stclose = false;
var closetick = 0;

var anim1 = new android.view.animation.ScaleAnimation(1, 0, 1, 0, gs(dip2px(162)), gs(dip2px(130))); //android.view.animation.TranslateAnimation(0, 500, 0, 400);
anim1.setDuration(200);
anim1.setFillAfter(true);
var close = () => {
    uithread(() => {
        let btn = new TextView(ctx);
        btn.setTextColor(0);
        btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
        btn.setText("Poshol von iz moego koda :D");
        btn.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function (v) {
                lay.startAnimation(anim1);
                stclose = true;
                //sleep(1000);
                //if(anim1.hasEnded()){
                gui.dismiss();
                //popup_menu.dismiss();
                // }

            }
        }));
        var gui = new android.widget.PopupWindow(btn, -1, -1);
        gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0, 0);
    })
}

var ping_timer = 10;
var ping_meter = (ip) => {
    var hostThread = new java.lang.Thread(new java.lang.Runnable({
        run() {
            //android.os.Looper.prepare();
            try {
                var ipAd = ip;
                var inet = java.net.InetAddress.getByName(ipAd);
                //if (Halcyon.isDev) customMessage("Sending Ping Request to " + ipAd);
                var finish = 0;
                var start = new java.util.GregorianCalendar().getTimeInMillis();
                if (inet.isReachable(5000)) {
                    finish = new java.util.GregorianCalendar().getTimeInMillis();
                    // if (Halcyon.isDev) customMessage("Ping RTT: " + (finish - start + "ms"));
                    png = (finish - start);
                } else {
                    png = -1;
                    //if (Halcyon.isDev) customMessage(ipAd + " NOT reachable.");
                }
            } catch (e) {
                if (Halcyon.isDev) customMessage(e);
            }
            //android.os.Looper.loop();

        }
    }))
    hostThread.start();
}

var inlevel_status = 1;

/*------------------------*\
| 🔥 Initialization
\*------------------------*/

new function () {
    //icon font
    if (ModPE.readData("ZWQ") != "" || Halcyon.isDev) {
        new java.lang.Thread({
            run() {

                //net.zhuoweizhang.mcpelauncher.Utils.getPrefs(2).edit().putInt("safe_mode_counter", 0).commit();
                if (!java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon").exists()) java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon").mkdirs();
                var fontFile = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon/icon-font.ttf");
                if (!fontFile.exists()) {
                    fontFile.createNewFile();
                    var fileOutputStream = new java.io.FileOutputStream(fontFile);
                    fileOutputStream.write(android.util.Base64.decode(ifont, 0));
                    fileOutputStream.close();
                };
                ifont = new android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon/icon-font.ttf");
                //get dpi and scale
                try {
                    var oF = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/", "options.txt");
                    let readed = (new java.io.BufferedReader(new java.io.FileReader(oF)));
                    let data = new java.lang.StringBuilder();
                    let string;
                    while ((string = readed.readLine()) != null) data.append(string + "\n");
                    //return data.toString();
                    var oT = data.toString();
                    if (oT.includes("key_key.attack:-99") || !oT.includes("key_key.attack:81")) {
                        //needR = true;
                        oT = oT.replace("key_key.attack:-99", "key_key.attack:81");
                        oT = oT.replace("key_key.drop:81", "key_key.drop:-99");
                        //oT = oT.split("keyboard_type_1")[0];
                        var fos = new java.io.FileOutputStream(oF, false);
                        fos.write(oT.getBytes());
                        fos.close();
                        customMessage("Settings replaced.");
                        //net.zhuoweizhang.mcpelauncher.ui.NerdyStuffActivity.forceRestart(ctx);
                    }
                    if (oT.includes("key_key.use:-98") || !oT.includes("key_key.use:69")) {
                        //needR = true;
                        oT = oT.replace("key_key.use:-98", "key_key.use:69");
                        oT = oT.replace("key_key.inventory:69", "key_key.drop:-98");
                        //oT = oT.split("keyboard_type_1")[0];
                        var fos = new java.io.FileOutputStream(oF, false);
                        fos.write(oT.getBytes());
                        fos.close();
                        customMessage("Settings replaced twice. Restart your MCPE");
                        //net.zhuoweizhang.mcpelauncher.ui.NerdyStuffActivity.forceRestart(ctx);
                    }
                } catch (e) {
                    customMessage(e)
                }
                //scale = Math.round(Math.round(ctx.getResources().getDisplayMetrics().density * 100) / 229 * 100) / 100 * 0.9;
                scale = 2.29 / (ctx.getResources().getDisplayMetrics().density); //(ctx.getResources().getDisplayMetrics().density) / 2.29
                var maincfg = new java.io.File(config.dir, "main.ini");
                var input = "scale:" + scale + "\n";
                var readed = "";
                if (!java.io.File(maincfg).exists()) {
                    maincfg.createNewFile();
                    filemanager.rewrite(maincfg, input);
                } else {
                    /*readed = filemanager.read(maincfg);
                    readed = readed.toString(); readed.split('\n');
                    readed.forEach((e,i,a)=> {
                        if(e == "scale"){
                            scale = parseFloat(a[i + 1])
                        }
                    });*/
                    var input1 = String(filemanager.read(maincfg)).split('\n')
                    input1.forEach((e, i, a) => {
                        if (i != a.length - 1) {
                            var par = e.split(":");
                            if (par[0] == "scale") scale = parseFloat(par[1])
                        }
                    })
                }
                //hud();
                //pos();
                /**if (!Render.initted && !Render_tracers.initted) {
                    Render.init();
                    //Render_tracers.
                    
                    Render.init();
                } */
                button();
                watermark();
                avr();

                if (Halcyon.isDev) {
                    customMessage('Scale=' + scale);
                    customMessage('Halcyon loaded successful! Total modules: ' + Halcyon.totalModules);
                    //scale = 1.3
                } else {
                    notification(ModPE.getLanguage() == "ru_RU" ? "Длинное нажатие по кнопке в меню, откроет меню настроек для модуля!" : "A long press on the button in the menu will open the settings menu for the module!");
                }
                Halcyon.mods.forEach(function (e) {
                    if (e.code.hasOwnProperty('toggle') && getState(e)) e.code.toggle();
                })

                //errorMessage(ModPE.readData('lol'))
                ModPE.removeData("ZWQ");

                /*function deleteAllFiles(dir) {
                    try {
                        arr = [];
                        dir.listFiles().forEach((e) => {
                            if (e.getName().indexOf(".cfg") != 1 && e.getName() != "default.cfg") {
                                arr.push(e.getName().replace(".cfg", ""));
                            }
                        })
                        //errorMessage(arr)
                    } catch (e) {
                        errorMessage(e)
                    }
                };*/


                try {
                    var dir = java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Halcyon")
                    dir.listFiles().forEach((e) => {
                        if (e.getName().indexOf(".nfp") != -1) {
                            e.delete();
                        }
                    })
                    //errorMessage(arr)
                } catch (e) {
                    errorMessage(e)
                }


            }
        }).start();

    } else {
        new java.lang.Thread({
            run() {
                java.lang.System.exit(0);
            }
        }).start();
    }
};

/*----------*\
| 🔥 Hooks
\*----------*/

var isMM = () => {
    if (ctx.getPackageName().indexOf("groundhog") != -1) {
        return true
    }else{
        return false
    }
}


var toDirectionalVector = (vector, yaw, pitch) => {};

var say = (what) => {
    var hostThread = new java.lang.Thread(new java.lang.Runnable({
        run() {
            try {
                var inst = new android.app.Instrumentation;
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_T);
                java.lang.Thread.sleep(100);
                inst.sendStringSync(what);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ENTER);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_BACK);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_BACK);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);

            } catch (e) {
                errorMessage(e)
            }

        }
    }))
    hostThread.start();

}

var cueCoord = (yaw, pitch) => {
    var prepVec = {
        x: 0,
        y: 0,
        z: 0
    };
    prepVec.y = -Math.sin(java.lang.Math.toRadians(pitch));
    prepVec.x = -Math.sin(java.lang.Math.toRadians(yaw)) * Math.cos(java.lang.Math.toRadians(pitch));
    prepVec.z = Math.cos(java.lang.Math.toRadians(yaw)) * Math.cos(java.lang.Math.toRadians(pitch));
    return prepVec;
}

var vecCoord = (x, y, z) => {
    this.x = x;
    this.y = y;
    this.z = z;
}

var clearName = (name) => {
    if (name != -1 && name != null && name != "" && name != undefined) {
        var badsymbols = [/§1/g, /§2/g, /§3/g, /§4/g, /§5/g, /§6/g, /§7/g, /§8/g, /§9/g, /§0/g, /§a/g, /§b/g, /§c/g, /§d/g, /§e/g, /§f/g, /§r/g, /§o/g, /§l/g, /§k/g];
        var cleared = name.split('\n')[0];
        badsymbols.forEach((e) => {
            cleared = cleared.replace(e, "");
        });
        return cleared
    } else {
        return "undefined"
    }
}

//init
new function () {
    if (isMM()) {
        new java.lang.Thread({
            run() {
                while (true) {
                    try {
                        Halcyon.mods.forEach(function (e) {
                            if (e.code.hasOwnProperty('tick')) e.code.tick();
                        })
                    } catch (e) {
                        errorMessage(e)
                    };
                    java.lang.Thread.sleep(50);
                }
            }
        }).start();
    }else{
        var modTick = () => {
            try {
                Halcyon.mods.forEach(function (e) {
                    if (e.code.hasOwnProperty('tick')) e.code.tick();
                })
            } catch (e) {
                errorMessage(e)
            };
        };
        var attackHook = (a, v) => {
            try {
                Halcyon.mods.forEach(function (e) {
                    if (e.code.hasOwnProperty('attack')) e.code.attack(a, v);
                });
            } catch (e) {
                errorMessage(e)
            }
        
        };
        var entityHurtHook = (a, v, h) => {
            try {
                Halcyon.mods.forEach(function (e) {
                    if (e.code.hasOwnProperty('hurt')) e.code.hurt(a, v, h);
                })
            } catch (e) {
                errorMessage(e)
            }
        };
        var useItem = (x, y, z, itemid, blockid, side, itemDamage, blockDamage) => {
            try {
                Halcyon.mods.forEach(function (e) {
                    if (e.code.hasOwnProperty('item')) e.code.item(x, y, z, itemid, blockid, side, itemDamage, blockDamage);
                });
                //notification("test "+Math.random());
            } catch (e) {
                errorMessage(e)
            }
        };
        var screenChangeHook = (screen) => {
            sscreen = screen;
            //print(screen)
        };
        var chatHook = (msg) => {
            var m = msg.split(" ");
            if (msg.charAt(0) == ".") {
                preventDefault();
                if (m[0] == ".e") {
                    if (m[1] == "max" && parseFloat(m[2]) && (getModule("EntityList").settings[1].values[0] < m[2])) {
                        getModule("EntityList").settings[0].values[0] = parseFloat(m[2]);
                        customMessage('EntityList: Maximal range - §a' + parseFloat(m[2]));
                        getCode(getModule("EntityList")).scan();
                    } else {
                        if (m[1] == "min" && parseFloat(m[2]) && (m[2] < getModule("EntityList").settings[0].values[0])) {
                            getModule("EntityList").settings[1].values[0] = parseFloat(m[2]);
                            customMessage('EntityList: Minimal range - §a' + parseFloat(m[2]));
                            getCode(getModule("EntityList")).scan();
                        } else {
                            customMessage('Usage: ".e <min/max> <value(only+ and smaller than max.)>"')
                        }
                    }
                    //config.create(m[1]);
                };
                if (m[0] == ".scale") {
                    scale = parseFloat(m[1]);
                    var input = "scale:" + scale + "\n";
                    filemanager.rewrite(new java.io.File(config.dir, "main.ini"), input);
                };
        
            }
        };

        var serverMessageReceiveHook = (msg) => {
            var notaccepted = ["чит", "Чит", "хак", "Хак", "ЧИТ", "cheat", "Cheat", "CHEAT", "hack", "hak", "Hack", "HACK", "Hak"];
        
            var a = {
                total: 0
            };
            notaccepted.forEach((e) => {
                if (msg.match(e)) {
                    a.total++;
        
                }
            })
            if (a.total != 0) {
                notification("<font color='red'>Warning!</font> <font color='white'>Someone called you are hacker!</font>")
            };
            a.total = 0;
            if (msg.indexOf('Я свой (H)') != -1 && !askedForMessage) {
                say("Я тоже :)");
                askedForMessage = true;
            }
            Halcyon.mods.forEach(function (e) {
                if (e.code.hasOwnProperty('msg')) e.code.msg(msg);
            })
        };
        var deathHook = (a, v) => {
            Halcyon.mods.forEach(function (e) {
                if (e.code.hasOwnProperty('death')) e.code.death(a, v);
            })
        };
    }
}