import static org.junit.Assert.*;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Signin {
	private static WebElement email, password, submit;  
	private static ChromeDriver driver;
	
	@BeforeClass
	public static void beforeAll() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "/Users/rajnish/Documents/Codes/test/chromedriver100");
		driver= new ChromeDriver();
		driver.get("https://fm-cegep.vercel.app/");
		Thread.sleep(3000);
		setAllElements();
	}

	@Test
	public void test1() throws InterruptedException {
		submit.click();
		checkMessage("Firebase: Error (auth/invalid-email).");
	}
	
	@Test
	public void test2() throws InterruptedException {
		email.sendKeys("asdsadas");
		submit.click();
		checkMessage("Firebase: Error (auth/invalid-email).");
	}
	
	@Test
	public void test3() throws InterruptedException {
		reset();
		email.sendKeys("testuser2@gmail.com");
		submit.click();
		checkMessage("Firebase: Error (auth/internal-error).");
	}
	
	@Test
	public void test4() throws InterruptedException {
		reset();
		email.sendKeys("testuser2@gmail.com");
		password.sendKeys("asdasd");
		submit.click();
		checkMessage("Firebase: Error (auth/wrong-password).");
	}
	
	
	@Test
	public void test5() {
		reset();
		email.sendKeys("testuser2@gmail.com");
		password.sendKeys("test123");
		submit.click();
		String currentUrl = driver.getCurrentUrl();
		System.out.print(currentUrl);
		Assert.assertEquals(currentUrl, "https://fm-cegep.vercel.app/");
	}
	
	public void checkMessage(String message) throws InterruptedException {
		Thread.sleep(2000);
		WebElement msgEle = driver.findElement(By.xpath("//*[@id=\"alert-message-fm\"]"));
		String msgText = msgEle.getText();
		System.out.print(msgText);
		Assert.assertEquals(message, msgText);
	}
	
	public static void reset() {
		email.clear();
		password.clear();
		email.sendKeys("");
		password.sendKeys("");
	}
	
	public static void setAllElements() {
		email = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[1]/input"));
		password = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[2]/input"));
		submit = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/button"));
	}
	
	
	@AfterClass
	public static void afterClass() {
		driver.close();
	}
}
