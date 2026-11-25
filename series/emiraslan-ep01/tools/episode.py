"""Episode data: scenes, dialogue and sound. `python3 tools/build.py` turns this into
index.html, compositions/captions.html, compositions/<scene>.html and assets/lib/dialogue.js.

Times inside a scene are local seconds from the scene's start."""

SCENES = [
    # id, duration, title (for README)
    ("title", 7, "Başlıq"),
    ("s1", 48, "Bakıda sakit səhər"),
    ("s2", 45, "Kapitan Emiraslan"),
    ("s3", 52, "Gözlənilməz maneə"),
    ("s4", 52, "Joker Team-lə qarşılaşma"),
    ("s5", 43, "Joker Team-in hiyləsi"),
    ("s6", 44, "Böyük qələbə"),
    ("s7", 22, "Gizli təhlükə"),
    ("end", 8, "Son"),
]

# speaker key -> caption name, colour
SPEAKERS = {
    "leader": ("JOKER TEAM LİDERİ", "#5ef06a"),
    "helper": ("KÖMƏKÇİ", "#c4f57a"),
    "emiraslan": ("EMİRASLAN", "#ffd23f"),
    "officer": ("NÖVBƏTÇİ", "#9fe0ff"),
    "driver": ("SÜRÜCÜ", "#ffb36b"),
    "lady": ("XANIM", "#ff9cc0"),
}

# (scene, local start, speaker, text, note) — note is shown after the name, e.g. "telefonda"
LINES = [
    ("s1", 21.0, "leader", "Bu gündən etibarən Bakı bizimdir! HAHAHA!", None),
    ("s1", 25.2, "helper", "Boss, bəs bizim plan nədir?", None),
    ("s1", 28.3, "leader", "Plan? Əvvəlcə hamını çaşdırırıq, sonra özümüz də nə etdiyimizi unuduruq!", None),
    ("s2", 8.5, "officer", "Kapitan! Joker Team yenə şəhərdədir!", "telefonda"),
    ("s2", 11.6, "emiraslan", "Yenə? Bunların başqa işi yoxdur?", None),
    ("s2", 14.8, "officer", "Kapitan, vəziyyət çox ciddidir!", "telefonda"),
    ("s2", 21.5, "emiraslan", "Yaxşı. Bu dəfə onlara zarafatın nə olduğunu göstərəcəyik!", None),
    ("s3", 13.5, "emiraslan", "Dayan... Bu nə gözəllikdir belə?", None),
    ("s3", 17.2, "driver", "Kapitan, Joker Team!", None),
    ("s3", 19.6, "emiraslan", "Hə, hə... Joker Team. Amma sən bir dəqiqə gözlə.", None),
    ("s3", 32.5, "emiraslan", "Emiraslan, sakit ol. Sən kapitan adamsan. Özünü ələ al!", "öz-özünə"),
    ("s3", 37.4, "officer", "Kapitan! Onlar artıq meydanı dağıdırlar!", "radiodan"),
    ("s3", 40.8, "emiraslan", "Yaxşı, romantikanı sonra davam etdirərik!", None),
    ("s4", 6.0, "leader", "HAHAHA! Budur bizim məşhur kapitan!", None),
    ("s4", 9.4, "emiraslan", "Sizə sonuncu xəbərdarlıqdır. Bu şou bitdi!", None),
    ("s4", 13.0, "leader", "Bizdən qorxmursan?", None),
    ("s4", 15.4, "emiraslan", "Mən sizin zarafatlarınıza belə gülmürəm!", None),
    ("s4", 36.5, "lady", "Kapitan! Siz çox qəhrəmancasınız!", None),
    ("s4", 39.8, "emiraslan", "Xanım, bu mənim vəzifə borcumdur!", None),
    ("s4", 43.4, "helper", "Boss, indi vuraq?", None),
    ("s4", 45.8, "leader", "Yox! Gözlə! Görürsən? Onun zəif nöqtəsini tapdıq!", None),
    ("s5", 4.0, "leader", "Diqqət! Kapitan Emiraslan üçün xüsusi sürprizimiz var!", None),
    ("s5", 14.2, "emiraslan", "Bu nə oyundur belə?", None),
    ("s5", 16.8, "driver", "Kapitan! Fikrinizi toplayın! Bu tələdir!", "radiodan"),
    ("s5", 23.2, "emiraslan", "Mən Kapitan Emiraslanam! Məni belə asanlıqla yayındıra bilməzsiniz!", None),
    ("s6", 3.0, "leader", "Bu dəfə bəxtin gətirdi, Emiraslan! Biz geri qayıdacağıq!", None),
    ("s6", 6.8, "emiraslan", "Gəlin, amma gələn dəfə zarafatlarınızı da özünüzlə gətirin!", None),
    ("s6", 12.0, "lady", "Çox sağ olun, kapitan. Siz həqiqətən qəhrəmansınız.", None),
    ("s6", 16.2, "emiraslan", "Buyurun, xanım. Kapitan Emiraslan hər zaman xidmətinizdədir.", None),
    ("s6", 25.5, "driver", "Kapitan, qərargaha qayıdaq?", None),
    ("s6", 28.0, "emiraslan", "Bir dəqiqə... O xanımın adını öyrəndik?", None),
    ("s6", 31.4, "driver", "Kapitan, siz indicə bütün Joker Team-i məğlub etdiniz. İndi də bu?", None),
    ("s6", 36.0, "emiraslan", "Hər qəhrəmanın öz missiyası var!", None),
    ("s7", 7.0, "officer", "Kapitan! Təcili xəbər! Joker Team-in lideri qaçıb!", "telefonda"),
    ("s7", 11.6, "emiraslan", "Yaxşı... Görünür, çay yenə soyuyacaq.", None),
]

# (scene, local time, file, volume, duration or None)
SFX = [
    ("title", 0.3, "whoosh-cinematic.mp3", 0.6, 3.0),
    ("s1", 17.0, "pop.mp3", 0.8, None),
    ("s1", 17.35, "pop.mp3", 0.8, None),
    ("s1", 17.7, "pop.mp3", 0.8, None),
    ("s1", 19.1, "impact-bass-2.mp3", 0.7, 2.0),
    ("s1", 24.3, "click.mp3", 0.7, None),
    ("s1", 33.2, "glitch-1.mp3", 0.5, 1.4),
    ("s1", 36.6, "whoosh-short.mp3", 0.7, None),
    ("s1", 40.0, "glitch-2.mp3", 0.5, 1.2),
    ("s1", 43.2, "whoosh.mp3", 0.7, None),
    ("s2", 5.0, "notification.mp3", 0.6, None),
    ("s2", 6.2, "notification.mp3", 0.6, None),
    ("s2", 20.4, "click.mp3", 0.8, None),
    ("s2", 26.0, "impact-bass-1.mp3", 0.6, 1.8),
    ("s2", 30.0, "whoosh-short.mp3", 0.6, None),
    ("s2", 34.0, "sparkle.mp3", 0.6, None),
    ("s2", 38.0, "riser.mp3", 0.5, 6.0),
    ("s3", 10.2, "sparkle.mp3", 0.5, None),
    ("s3", 27.0, "sparkle.mp3", 0.6, None),
    ("s3", 37.0, "glitch-2.mp3", 0.4, 0.6),
    ("s3", 44.2, "whoosh-cinematic.mp3", 0.6, 3.5),
    ("s4", 19.0, "whoosh-short.mp3", 0.7, None),
    ("s4", 20.0, "impact-bass-1.mp3", 0.7, 1.5),
    ("s4", 24.0, "whoosh.mp3", 0.6, None),
    ("s4", 25.4, "impact-bass-2.mp3", 0.6, 1.5),
    ("s4", 29.6, "whoosh-short.mp3", 0.6, None),
    ("s4", 31.0, "pop.mp3", 0.8, None),
    ("s4", 39.2, "sparkle.mp3", 0.6, None),
    ("s5", 8.0, "glitch-1.mp3", 0.5, 1.0),
    ("s5", 9.5, "chime.mp3", 0.5, None),
    ("s5", 21.5, "sparkle.mp3", 0.6, None),
    ("s5", 27.0, "riser.mp3", 0.6, 3.6),
    ("s5", 30.6, "impact-bass-2.mp3", 0.9, 2.0),
    ("s5", 35.0, "glitch-2.mp3", 0.6, 1.0),
    ("s5", 36.0, "pop.mp3", 0.9, None),
    ("s5", 36.2, "chime.mp3", 0.6, None),
    ("s6", 0.2, "whoosh.mp3", 0.6, None),
    ("s6", 15.6, "sparkle.mp3", 0.5, None),
    ("s7", 5.5, "notification.mp3", 0.6, None),
    ("s7", 10.5, "sparkle.mp3", 0.5, None),
    ("end", 0.2, "impact-bass-2.mp3", 0.8, 2.4),
]

# ambience beds generated by tools/make_beds.sh: (file, from scene, to scene incl., volume)
BEDS = [
    ("bed-sea.mp3", "s1", "s1", 0.5),
    ("bed-room.mp3", "s2", "s2", 0.35),
    ("bed-car.mp3", "s3", "s3", 0.45),
    ("bed-crowd.mp3", "s4", "s6", 0.4),
    ("bed-room.mp3", "s7", "s7", 0.35),
]
