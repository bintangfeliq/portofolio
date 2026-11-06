package com.example.portofolio.seeder;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.portofolio.model.Gambar;
import com.example.portofolio.model.Keahlian;
import com.example.portofolio.model.Kontak;
import com.example.portofolio.model.Pendidikan;
import com.example.portofolio.model.Profil;
import com.example.portofolio.model.Project;
import com.example.portofolio.model.User;
import com.example.portofolio.repository.GambarRepository;
import com.example.portofolio.repository.KeahlianRepository;
import com.example.portofolio.repository.KontakRepository;
import com.example.portofolio.repository.PendidikanRepository;
import com.example.portofolio.repository.ProfilRepository;
import com.example.portofolio.repository.ProjectRepository;
import com.example.portofolio.repository.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProfilRepository profilRepository;
    private final KontakRepository kontakRepository;
    private final PendidikanRepository pendidikanRepository;
    private final KeahlianRepository keahlianRepository;
    private final ProjectRepository projectRepository;
    private final GambarRepository gambarRepository;
    private final UserRepository userRepository;

    public DataSeeder(ProfilRepository profilRepository,
                      KontakRepository kontakRepository,
                      PendidikanRepository pendidikanRepository,
                      KeahlianRepository keahlianRepository,
                      ProjectRepository projectRepository,
                      GambarRepository gambarRepository,
                      UserRepository userRepository) {
        this.profilRepository = profilRepository;
        this.kontakRepository = kontakRepository;
        this.pendidikanRepository = pendidikanRepository;
        this.keahlianRepository = keahlianRepository;
        this.projectRepository = projectRepository;
        this.gambarRepository = gambarRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        seedUser();
        seedProfil();
        seedKontak();
        seedPendidikan();
        seedKeahlian();
        seedProject();
    }

    private void seedUser() {
        Optional<User> opt = userRepository.findByUsername("bintang.username");
        if (opt.isEmpty()) {
            User user = new User();
            user.setUsername("bintang.username");
            user.setPassword("123456789");
            userRepository.save(user);
        }
    }

    private void seedProfil() {
        if (profilRepository.count() == 0) {
            Profil profil = new Profil();
            profil.setNama("Muhammad Bintang Feliq");
            profil.setAlamat("Kota Bandung, Jawa Barat");
            profil.setDeskripsi("Saya adalah siswa kelas XII RPL di SMK Assalaam Bandung yang memiliki minat dalam pengembangan perangkat lunak dan teknologi informasi. Saya senang belajar, bekerja dalam tekanan, serta terus mengembangkan keterampilan di bidang teknologi.");
            profil.setTentangSaya("Saya adalah siswa kelas XII Rekayasa Perangkat Lunak (RPL) di SMK Assalaam Bandung yang memiliki minat dalam pengembangan perangkat lunak dan teknologi informasi. Saya senang mempelajari pemrograman, pengembangan website, serta berbagai teknologi baru untuk meningkatkan kemampuan dan pengalaman saya. Di waktu luang, saya juga memiliki hobi bersepeda dan mengeksplorasi hal-hal baru di dunia teknologi. Saya senang bekerja dalam tim, berdiskusi, memecahkan masalah, dan terus belajar dari setiap pengalaman. Ke depannya, saya ingin menjadi seorang programmer sekaligus membangun usaha di bidang teknologi yang dapat memberikan manfaat bagi banyak orang.");
            profil.setFoto("1793933340951_profil (1).png");
            profil.setCv("1788229251963_CV.jpg");
            profilRepository.save(profil);
        }
    }

    private void seedKontak() {
        if (kontakRepository.count() == 0) {
            Kontak kontak = new Kontak();
            kontak.setEmail("bintangfeliq1@gmail.com");
            kontak.setTelepon("+62 851-2123-4353");
            kontak.setGithub("https://github.com/bintangfeliq/");
            kontak.setInstagram("https://www.instagram.com/bntng.blue/");
            kontakRepository.save(kontak);
        }
    }

    private void seedPendidikan() {
        if (pendidikanRepository.count() == 0) {
            Pendidikan p1 = new Pendidikan();
            p1.setTingkat("TK");
            p1.setNama("Darussalaam-Cangkuang");
            p1.setTahunMulai(2013);
            p1.setTahunSelsai(2015);
            pendidikanRepository.save(p1);

            Pendidikan p2 = new Pendidikan();
            p2.setTingkat("SD");
            p2.setNama("Al-Basyariyah-Cibaduyut");
            p2.setTahunMulai(2015);
            p2.setTahunSelsai(2021);
            pendidikanRepository.save(p2);

            Pendidikan p3 = new Pendidikan();
            p3.setTingkat("MTS");
            p3.setNama("Al-Falah-Cicalengka");
            p3.setTahunMulai(2021);
            p3.setTahunSelsai(2024);
            pendidikanRepository.save(p3);

            Pendidikan p4 = new Pendidikan();
            p4.setTingkat("SMK");
            p4.setNama("Al-Falah-Nagreg");
            p4.setTahunMulai(2024);
            p4.setTahunSelsai(2026);
            pendidikanRepository.save(p4);

            Pendidikan p5 = new Pendidikan();
            p5.setTingkat("SMK");
            p5.setNama("Assalaam-bandung");
            p5.setTahunMulai(2026);
            p5.setTahunSelsai(null);
            pendidikanRepository.save(p5);
        }
    }

    private void seedKeahlian() {
        if (keahlianRepository.count() == 0) {
            keahlianRepository.save(new Keahlian(null, "PHP", "Sudah dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Spring boot", "masih dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Postgresql", "masih dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Canva", "sudah dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Laravel", "sudah dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Git & GitHub", "masih dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Mysql", "sudah dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Java", "masih dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Figma", "sudah dipelajari"));
            keahlianRepository.save(new Keahlian(null, "Microsoft office", "sudah dipelajari"));
        }
    }

    private void seedProject() {
        if (projectRepository.count() == 0) {
            Project prj1 = new Project();
            prj1.setNamaProject("Perpustakaan Digital");
            prj1.setTeknologi("PHP, Laravel, Mysql");
            prj1.setDeskripsi("Project sistem Perpustakaan Digital Seperti Peminjaman, pengembalian Serta pengelolaan Buku Secara Digital menggunakan PHP, Laravel, dan Mysql");
            Project savedPrj1 = projectRepository.save(prj1);

            List<String> imgs1 = List.of(
                "1793934172567_1ecd99d6_1788149360833_Screenshot 2026-08-31 083510.png",
                "1793934172579_02f9b177_1788149360847_Screenshot 2026-08-31 083621.png",
                "1793934172589_195c51c7_1788149360869_Screenshot 2026-08-31 083648.png",
                "1793934172602_acf01ca6_1788149360898_Screenshot 2026-08-31 083711.png",
                "1793934172612_24e6ad75_1791122353755_2ba727e7_Screenshot 2026-10-04 205755.png",
                "1793934172622_52f87b49_1791122353771_22124ff3_Screenshot 2026-10-04 205811.png",
                "1793934172635_6dbb7030_1791122353785_555662b3_Screenshot 2026-10-04 205843.png"
            );
            for (String imgName : imgs1) {
                Gambar g = new Gambar();
                g.setGambar(imgName);
                g.setProject(savedPrj1);
                gambarRepository.save(g);
            }

            Project prj2 = new Project();
            prj2.setNamaProject("Mini Game");
            prj2.setTeknologi("Scratch");
            prj2.setDeskripsi("Membuat Mini Game menggunakan Scratch dengan tema game menghindari mobil mobil, game ini memiliki beberapa level dan tantangan yang harus diselesaikan oleh pemain untuk mencapai garis finish.");
            Project savedPrj2 = projectRepository.save(prj2);

            List<String> imgs2 = List.of(
                "1793934069666_3efe807f_1788151776419_Screenshot 2026-08-31 114144.png",
                "1793934069694_241bd338_1788151776453_Screenshot 2026-08-31 114203.png"
            );
            for (String imgName : imgs2) {
                Gambar g = new Gambar();
                g.setGambar(imgName);
                g.setProject(savedPrj2);
                gambarRepository.save(g);
            }

            Project prj3 = new Project();
            prj3.setNamaProject("SakuKita");
            prj3.setTeknologi("Java , Spring boot, postgreSql");
            prj3.setDeskripsi("Aplikasi untuk mencatat keungan bulanan seperti pengeluaran dan pemasukan bulanan, serta menampilkan laporan keuangan bulanan dalam bentuk grafik dan tabel, serta menampilkan sisa saldo bulanan");
            Project savedPrj3 = projectRepository.save(prj3);

            List<String> imgs3 = List.of(
                "1793891079526_2d987fc9_Screenshot 2026-11-05 215640.png",
                "1793891079575_1f2b1d1b_Screenshot 2026-11-05 215646.png",
                "1793891079586_cf8b45fc_Screenshot 2026-11-05 215659.png",
                "1793891079596_2d10365f_Screenshot 2026-11-05 215733.png",
                "1793891079609_efbe1933_Screenshot 2026-11-05 215746.png",
                "1793891079618_66451e88_Screenshot 2026-11-05 215757.png",
                "1793891079633_07d27039_Screenshot 2026-11-05 215808.png",
                "1793891079647_0464ec90_Screenshot 2026-11-05 215824.png"
            );
            for (String imgName : imgs3) {
                Gambar g = new Gambar();
                g.setGambar(imgName);
                g.setProject(savedPrj3);
                gambarRepository.save(g);
            }

            Project prj4 = new Project();
            prj4.setNamaProject("belajar.yuk");
            prj4.setTeknologi("PHP, Laravel, Mysql");
            prj4.setDeskripsi("website bribadi untuk mengelola tugas, pekerjaan rumah, menyimpan file pembelajaran dan, menyimpan catatan pelajaran pribadi untuk dipelajari kembali");
            Project savedPrj4 = projectRepository.save(prj4);

            List<String> imgs4 = List.of(
                "1793929813908_d7f41c24_1793929413013_44e77cc8_Screenshot 2026-11-06 083431.png",
                "1793929814250_d12c153d_1793929413188_513cbeaa_Screenshot 2026-11-06 083442.png",
                "1793929814275_4c0d9954_1793929413214_2536a2cd_Screenshot 2026-11-06 083453.png",
                "1793929814337_36486935_1793929413252_7c7cbb51_Screenshot 2026-11-06 083505.png",
                "1793929814393_bf1a67d7_1793929413314_cc521785_Screenshot 2026-11-06 083517.png",
                "1793929814417_0eb33aed_1793929413359_23aeb75f_Screenshot 2026-11-06 083531.png",
                "1793929814454_d5a50c56_1793929413402_fefd674d_Screenshot 2026-11-06 083540.png",
                "1793929814478_a291ab08_1793929413440_21756d73_Screenshot 2026-11-06 083551.png",
                "1793929814510_3fa836ed_1793929413469_260ccb16_Screenshot 2026-11-06 083601.png"
            );
            for (String imgName : imgs4) {
                Gambar g = new Gambar();
                g.setGambar(imgName);
                g.setProject(savedPrj4);
                gambarRepository.save(g);
            }
        }
    }
}
